from keras.models import Model
from keras.layers import Input, concatenate, Dropout, Reshape, Permute, Activation, BatchNormalization
from keras.layers.convolutional import Conv2D, MaxPooling2D, UpSampling2D
from keras.initializers import orthogonal, he_normal
from keras.regularizers import l2
from keras.activations import relu

def regulator(net, dropout=True, BN = True):
    if BN == True:
        net = BatchNormalization()(net)


    net = Activation('relu')(net)

    if dropout == True:
        net = Dropout(0.2)(net)



    return net

def Unet(nClasses, input_height=256, input_width=256, nChannels=3, dropout=False, BN=True):
    inputs = Input(shape=(input_height, input_width, nChannels))
    # encode
    # 256x256
    conv1 = Conv2D(64, (3, 3), padding='same', kernel_initializer=orthogonal())(inputs)
    conv1 = regulator(conv1, dropout, BN)
    conv1 = Conv2D(64, (3, 3), padding='same', kernel_initializer=orthogonal())(conv1)
    conv1 = regulator(conv1, dropout, BN)
    pool1 = MaxPooling2D(pool_size=(2, 2))(conv1)
    # 128x128
    conv2 = Conv2D(128, (3, 3), padding='same', kernel_initializer=orthogonal())(pool1)
    conv2 = regulator(conv2, dropout, BN)
    conv2 = Conv2D(128, (3, 3), padding='same', kernel_initializer=orthogonal())(conv2)
    conv2 = regulator(conv2, dropout, BN)
    pool2 = MaxPooling2D(pool_size=(2, 2))(conv2)
    # 64x64
    conv3 = Conv2D(256, (3, 3), padding='same', kernel_initializer=orthogonal())(pool2)
    conv3 = regulator(conv3, dropout, BN)
    conv3 = Conv2D(256, (3, 3), padding='same', kernel_initializer=orthogonal())(conv3)
    conv3 = regulator(conv3, dropout, BN)
    pool3 = MaxPooling2D(pool_size=(2, 2))(conv3)
    # 32x32
    conv4 = Conv2D(256, (3, 3), padding='same', kernel_initializer=orthogonal())(pool3)
    conv4 = regulator(conv4, dropout, BN)
    conv4 = Conv2D(256, (3, 3), padding='same', kernel_initializer=orthogonal())(conv4)
    conv4 = regulator(conv4, dropout, BN)
    pool4 = MaxPooling2D(pool_size=(2, 2))(conv4)
    # 16x16
    conv5 = Conv2D(256, (3, 3), padding='same', kernel_initializer=orthogonal())(pool4)
    conv5 = regulator(conv5, dropout, BN)
    conv5 = Conv2D(256, (3, 3), padding='same', kernel_initializer=orthogonal())(conv5)
    conv5 = regulator(conv5, dropout, BN)
    pool5 = MaxPooling2D(pool_size=(2, 2))(conv5)
    # 8x8

    # decode
    up6 = UpSampling2D(size=(2, 2))(pool5)
    up6 = concatenate([up6, conv5], axis=-1)
    conv6 = Conv2D(256, (3, 3), padding='same', kernel_initializer=orthogonal())(up6)
    conv6 = regulator(conv6, dropout, BN)
    conv6 = Conv2D(256, (3, 3), activation='relu', padding='same', kernel_initializer=orthogonal())(conv6)

    up7 = UpSampling2D(size=(2, 2))(conv6)
    up7 = concatenate([up7, conv4], axis=-1)
    conv7 = Conv2D(256, (3, 3), padding='same', kernel_initializer=orthogonal())(up7)
    conv7 = regulator(conv7, dropout, BN)
    conv7 = Conv2D(256, (3, 3), activation='relu', padding='same', kernel_initializer=orthogonal())(conv7)

    up8 = UpSampling2D(size=(2, 2))(conv7)
    up8 = concatenate([up8, conv3], axis=-1)
    conv8 = Conv2D(256, (3, 3), padding='same', kernel_initializer=orthogonal())(up8)
    conv8 = regulator(conv8, dropout, BN)
    conv8 = Conv2D(256, (3, 3), activation='relu', padding='same', kernel_initializer=orthogonal())(conv8)

    up9 = UpSampling2D(size=(2, 2))(conv8)
    up9 = concatenate([up9, conv2], axis=-1)
    conv9 = Conv2D(128, (3, 3), padding='same', kernel_initializer=orthogonal())(up9)
    conv9 = regulator(conv9, dropout, BN)
    conv9 = Conv2D(128, (3, 3), activation='relu', padding='same', kernel_initializer=orthogonal())(conv9)

    up10 = UpSampling2D(size=(2, 2))(conv9)
    up10 = concatenate([up10, conv1], axis=-1)
    conv10 = Conv2D(64, (3, 3), padding='same', kernel_initializer=orthogonal())(up10)
    conv10 = regulator(conv10, dropout, BN)
    conv10 = Conv2D(64, (3, 3), activation='relu', padding='same', kernel_initializer=orthogonal())(conv10)

    conv11 = Conv2D(nClasses, (1, 1), padding='same', activation='relu',
                   kernel_initializer=he_normal(), kernel_regularizer=l2(0.005))(conv10)
    conv11 = Reshape((nClasses, input_height * input_width))(conv11)
    conv11 = Permute((2, 1))(conv11)

    conv11 = Activation('softmax')(conv11)

    model = Model(input=inputs, output=conv11)

    return model