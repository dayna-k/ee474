from __future__ import division
import numpy as np
import cv2
from models import unet
from utils.segdata_generator import generator
import argparse
import colorsys
import os
from tqdm import tqdm

import time




## generate list part

def gen_list(img_file):
    f1 = open('./test.txt', 'w')
    pd = tqdm(total=1)
    pd.update(1)
    f1.write(img_file + ' ' + img_file + '\n')
    pd.close()
    f1.close()


## predict part

def predict_segmentation():
    images_path = args.images

    img_dir = os.path.dirname(images_path) + '/'
    img_file = images_path.split('/')[-1]

    print img_dir, img_file

    gen_list(img_file)
    n_classes = 3
    val_file = './test.txt'

    img = cv2.imread(images_path, 1)

    img_height = img.shape[0]
    img_width = img.shape[1]

    input_height = 256
    input_width = 256

    m = unet.Unet(n_classes, input_height=input_height, input_width=input_width, dropout=True, BN=False)

    m.load_weights("./weights/parse_weights.h5")
    m.compile(loss='categorical_crossentropy',
              optimizer='adam',
              metrics=['accuracy'])

    for x, y in generator(img_dir, val_file, 1, n_classes, input_height, input_width, train=False):
        pr = m.predict(x)[0]
        pr = pr.reshape((input_height, input_width, n_classes)).argmax(axis=2)
        seg_img = np.zeros((input_height, input_width, 3))



        colors = np.array([[255, 0, 0], [0, 255, 0], [0, 0, 255]])

        for c in range(n_classes):
            seg_img[:, :, 0] += ((pr[:, :] == c) * (colors[c][0])).astype('uint8')
            seg_img[:, :, 1] += ((pr[:, :] == c) * (colors[c][1])).astype('uint8')
            seg_img[:, :, 2] += ((pr[:, :] == c) * (colors[c][2])).astype('uint8')

        if img_height >= img_width:
            scale = img_height / input_height
            new_width = int(img_width / scale)  # new_width = 170
            diff = (input_width - new_width) // 2  # diff = 43
            seg_img = seg_img[:, diff:diff+new_width,:]

        else:
            scale = img_width / input_width
            new_height = int(img_height / scale)
            diff = (input_height - new_height) // 2
            seg_img = seg_img[diff:diff + new_height, :, :]

        seg_img = cv2.resize(seg_img, (img_width, img_height))

        return seg_img


## recoloring part

def imageSegmentationGenerator():

    im_fn = args.images

    pred = predict_segmentation()

    org = cv2.imread(im_fn, 1)


    re = cv2.imread(im_fn, 1)


    for height in range(org.shape[0]):
            for width in range(org.shape[1]):
                if (pred[height][width][1] == 255):
                    b, g, r = re[height, width]
                    h, s, v = colorsys.rgb_to_hsv(r / 255, g / 255, b / 255)
                    h = (h + args.top/100) - int(h + args.top/100)
                    # s = (s + args.top/100) - int(s + args.top/100)
                    r, g, b = colorsys.hsv_to_rgb(h, s, v)
                    re[height, width] = b * 255, g * 255, r * 255
                if (pred[height][width][2] == 255):
                    b, g, r = re[height, width]
                    h, s, v = colorsys.rgb_to_hsv(r / 255, g / 255, b / 255)
                    h = (h + args.bottom/100) - int(h + args.bottom/100)
                    # s = (s + args.top / 100) - int(s + args.top / 100)
                    r, g, b = colorsys.hsv_to_rgb(h, s, v)
                    re[height, width] = b * 255, g * 255, r * 255


    cv2.imshow("org", org)
    cv2.imshow("re", re)
    cv2.imwrite("./output/output.jpg", re)


if __name__ == '__main__':

    s = time.time()


    parser = argparse.ArgumentParser()
    parser.add_argument("--images", type=str, default='./input/test.jpg')
    parser.add_argument("--top", type=int, default=20)
    parser.add_argument("--bottom", type=int, default=20)
    args = parser.parse_args()

    imageSegmentationGenerator()


    e = time.time()

    print ('Total Time : {} seconds'.format(e-s))
