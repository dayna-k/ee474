## Making cifar10 load function

import os
import tensorflow as tf
import pickle
import numpy as np
import random

def load_cifar10():
    data_dir = os.path.join('./cifar-10-batches-py')
    with open(data_dir+'/data_batch_1', 'rb') as fo:
        data1 = pickle.load(fo)['data']
    with open(data_dir+'/data_batch_2', 'rb') as fo:
        data2 = pickle.load(fo)['data']
    with open(data_dir+'/data_batch_3', 'rb') as fo:
        data3 = pickle.load(fo)['data']
    with open(data_dir+'/data_batch_4', 'rb') as fo:
        data4 = pickle.load(fo)['data']
    with open(data_dir + '/data_batch_5', 'rb') as fo:
        data5 = pickle.load(fo)['data']
    data = np.concatenate([data1, data2, data3, data4, data5], axis=0)
    data = np.reshape(data, [50000,3,32,32])
    data = np.transpose(data,[0,2,3,1])
    return data


# =======================================================================
# This function creates the autoencoder
#  - Construct the autoencoder model
#         - 2 convoltional layers
#         - 2 deconvoltional layers
# =========================================================================
def Autoencoder_model(rgb_im):
    # Encoder with Convolution Layer
    conv1 = tf.layers.conv2d(rgb_im, filters=32, kernel_size=(3,3), strides=(2,2), padding = 'SAME', activation=tf.nn.relu, name="Conv_1")
    conv2 = tf.layers.conv2d(conv1, filters=64, kernel_size=(3,3), strides=(2,2), padding='SAME', activation=tf.nn.relu, name="Conv_2")

    # Decoder with Deconvolution Layer
    deconv1 = tf.layers.conv2d_transpose(conv2, filters=32, kernel_size=(3,3), strides=(2,2), padding='SAME', activation=tf.nn.relu, name="Deconv_1")
    deconv2 = tf.layers.conv2d_transpose(deconv1, filters=3, kernel_size=(3,3), strides=(2,2), padding='SAME', activation=tf.nn.relu, name="Deconv_2")
    
    tf.summary.image('predicted_Binary', deconv2, 3)

    
    # Put images on the tensorboard.
    tf.summary.image('input', rgb_im, 3)
    # ground truth gray scale image
    gt_gray_im = tf.image.rgb_to_grayscale(rgb_im)
    # ground truth binary image from original image
    threshold = 127
    cond_gt = tf.greater(gt_gray_im, tf.ones(tf.shape(gt_gray_im))*threshold)
    gt_binary_im = tf.where(cond_gt, tf.ones(tf.shape(gt_gray_im))*255, tf.zeros(tf.shape(gt_gray_im)))
    
    tf.summary.image('gt_Binary', gt_binary_im, 3)

    return deconv2


#Construct the Network graph

def main():

    #define the optimizer parameters, and learning parameters

    minibatch_size = 128
    lear_rate = 0.005
    # lear_rate = 0.0002
    bta1 = 0.9
    bta2 = 0.999
    epsln = 0.00000001

    # ===========================================================================
    # generate the network graph of our model
    # ===========================================================================

    rgb_im = tf.placeholder(tf.float32, shape=[None,32,32,3],name="x")
    gt_gray_im = tf.image.rgb_to_grayscale(rgb_im)
    threshold = 127
    cond_gt = tf.greater(gt_gray_im, tf.ones(tf.shape(gt_gray_im)) * threshold)
    gt_binary_im = tf.where(cond_gt, tf.ones(tf.shape(gt_gray_im)) * 255, tf.zeros(tf.shape(gt_gray_im)))

    predicted_binary_im = Autoencoder_model(rgb_im)

    # Define the loss
    with tf.name_scope("Loss"):
        pixel_loss = tf.reduce_mean(tf.square(predicted_binary_im - gt_binary_im))
        tf.summary.scalar("pixel_loss", pixel_loss)

    # Define the optimizer
    optimizer = tf.train.AdamOptimizer(learning_rate = lear_rate, beta1 = bta1, beta2 = bta2, epsilon = epsln).minimize(pixel_loss)

    summ = tf.summary.merge_all()
    # 'Saver' op to save and restore all the variables
    saver = tf.train.Saver()

    # =========================================================================
    # create the session and perform the training and validation operations
    # =========================================================================
    with tf.Session() as sess:
        LOGDIR = './cifar10_color_tutorial_HW/'
        Test_writer = tf.summary.FileWriter(LOGDIR+'/Test')

        data = load_cifar10()/1.

        test_index = [9995, 9999, 10000]
        test_data = data[test_index,:,:,:]

        train_index = range(0,50000)
        train_index = [x for x in train_index if x not in test_index]
        train_data = data[train_index,:,:,:]

        # Initializing the variables
        sess.run(tf.global_variables_initializer()) # execute a learning iteration (froward and backward propagation for a minibatch)
        for itr in range(20001):
            batch_idx = random.sample(range(train_data.shape[0]), minibatch_size)
            train_batch = train_data[batch_idx, :,:,:]
            _ = sess.run([optimizer], feed_dict = {rgb_im: train_batch})
            if itr % 100 == 0:
                [train_loss]= sess.run([pixel_loss], feed_dict = {rgb_im: train_batch})
                [test_loss, s] = sess.run([pixel_loss, summ], feed_dict={rgb_im: test_data})
                print('@ iteration: %i, Training loss = %.6f, Test loss = %.6f '%(itr, train_loss, test_loss))
                Test_writer.add_summary(s,itr)
                saver.save(sess, os.path.join(LOGDIR, "model.ckpt"), itr)

if __name__ == '__main__':
    main()

