from __future__ import division
import numpy as np
import cv2
from models import unet
from utils.segdata_generator import generator
import argparse
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

def predict_segmentation(im_fn):
    images_path = im_fn

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

    m = unet.Unet(n_classes, input_height=input_height, input_width=input_width, dropout=False, BN=True)

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
        # cv2.imwrite("./test_seg_previous2.png", seg_img)
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
        # cv2.imwrite("./test_seg_previous.png", seg_img)
        seg_img = cv2.resize(seg_img, (img_width, img_height), interpolation= cv2.INTER_LINEAR)
        # cv2.imwrite("./test_seg.png", seg_img)
        return seg_img


## recoloring part

def imageSegmentationGenerator(img_path, idx):
    # assert (args.top[0] >= 1) and (args.top[0] <= 9)
    # assert (args.bottom[0] >= 1) and (args.bottom[0] <= 9)
    # assert abs(args.top[1])<=2
    # assert abs(args.bottom[1]) <= 2

    # im_fn = args.images

    im_fn = './UI/'+img_path[idx]

    pred = predict_segmentation(im_fn)

    org = cv2.imread(im_fn, 1)


    hue_list = [0, 25, 50, 125, 190, 180, 230, 280, 300]

    for th in range(1, 11):
        for ts in range(1, 6):
            for bh in range(1, 11):
                for bs in range(1, 6):

                    re = cv2.imread(im_fn, 1)
                    re = cv2.cvtColor(re, cv2.COLOR_BGR2HSV)

                    for height in range(org.shape[0]):
                            for width in range(org.shape[1]):
                                pixel = list(pred[height][width])
                                if ((pixel.index(max(pixel))==1)):
                                    if th != 1:
                                        re[height:height + 1, width:width + 1, 0] = hue_list[th-2] / 2

                                    s = (float)(re[height:height+1, width:width+1, 1] / 255)
                                    factor = (float)( (3 -ts) / 2) # range from -1 to 1

                                    s = (int)(((-s + 0.5) * factor * factor + 0.5 * factor + s) * 255)

                                    re[height:height + 1, width:width + 1, 1] = min(255,max(0,s))

                                elif ((pixel.index(max(pixel))==2)):
                                    if bh != 1:
                                        re[height:height + 1, width:width + 1, 0] = hue_list[bh-2] / 2

                                    s = (float)(re[height:height+1, width:width+1, 1] / 255)
                                    factor = (float)((3-bs)/2) # range from -1 to 1

                                    s = (int)(((-s + 0.5) * factor * factor + 0.5 * factor + s)*255)

                                    re[height:height + 1, width:width + 1, 1] = min(255,max(0,s))
                    re = cv2.cvtColor(re, cv2.COLOR_HSV2BGR)

                    path = './UI/' + img_path[idx][0:5] + '/{0}_{1}_{2}_{3}_{4}.png'.format(img_path[idx][0:5],th,ts,bh,bs)
                    cv2.imwrite(path, re)

if __name__ == '__main__':

    # parser = argparse.ArgumentParser()
    # parser.add_argument("--images", type=str, default='./test2.jpg')
    # parser.add_argument("--top", nargs=2, type=int, default=[7,20])
    # parser.add_argument("--bottom", nargs=2, type=int, default=[3,20])
    # args = parser.parse_args()
    img_path = ['test1.png', 'test2.png', 'test3.jpg','test4.jpg']
    for idx in range(1,5):
        imageSegmentationGenerator(img_path, idx)
        print ('Image {} is finished'.format(img_path[idx]))
