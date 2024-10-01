# This is to train and test model i will create another file to deplow it

import os, glob

import matplotlib.pyplot as plt
import numpy as np
import seaborn as sns
import pandas as pd

from sklearn.model_selection import train_test_split
from keras.preprocessing.image import ImageDataGenerator
from keras.models import Model
from keras.layers import Conv2D , MaxPooling2D, Flatten , Dense , Dropout
from keras.callbacks import Callback , EarlyStopping
from keras.applications import ResNet50
from keras.applications.resnet50 import preprocess_input
from sklearn.metrics import classification_report




training_data_set = r'C:\Users\omkar\OneDrive\Desktop\skin_disease\train'

name_class = os.listdir(training_data_set)
#print(name_class)

filepaths = list(glob.glob(training_data_set +'/**/*.*'))

#print(filepaths)
labels = list(map(lambda x : os.path.split(os.path.split(x)[0])[1],filepaths))
#print(labels)
filepath = pd.Series(filepaths,name= 'filepath').astype(str)
labels =pd.Series (labels, name ='label')
data = pd.concat([filepath , labels],axis =1)
data = data.sample(frac=1).reset_index(drop =True)
#print(data.head(5))

train , test = train_test_split(data, test_size =0.25 , random_state =42)

#augmentation
train_datagen = ImageDataGenerator(preprocessing_function=preprocess_input)

train_gen = train_datagen.flow_from_dataframe(
    dataframe=train,
    x_col= 'filepath',
    y_col ='label',
    target_size= (100,100),
    class_mode ='categorical',
    batch_size = 32,
    shuffle = True,
    seed= 42
)
valid_gen = train_datagen.flow_from_dataframe(
    dataframe=train ,
    x_col= 'filepath',
    y_col ='label',
    target_size= (100,100),
    class_mode = 'categorical',
    batch_size = 32,
    shuffle = False,
    seed= 42
)
test_gen = train_datagen.flow_from_dataframe(
    dataframe=test,
    x_col= 'filepath',
    y_col ='label',
    target_size= (100,100),
    class_mode ='categorical',
    batch_size = 32,
    shuffle = False,
    seed= 42
)
pretrained_model = ResNet50(weights='imagenet', include_top=False, input_shape=(224, 224, 3), pooling= 'avg')


pretrained_model.trainable = False

inputs = pretrained_model.input

x = Dense(128 , activation = 'relu')(pretrained_model.output)
x = Dense(128, activation ='relu')(x)
outputs = Dense(23,activation = 'softmax')(x)
model = Model(inputs = inputs , outputs =outputs)

model.compile(
    optimizer ='adam',
    loss = 'categorical_crossentropy',
    metrics = ['accuracy']
)

my_callbacks = [EarlyStopping(monitor = 'val_accuracy',
                              min_delta =0,
                              patience =2,
                              mode = 'auto')]

history = model.fit(
    train_gen,validation_data = valid_gen ,
    epochs=12
)

#saving the mother fucking model  bitch
model.save("model_resnet50.h5")

"""pd.DataFrame(history)[['accuracy' , 'val_accuracy']]
plt.title("accuracy")
plt.show()
pd.DataFrame(history)[['loss','val_loss']].plot()
plt.title("loss")
plt.show"""
"""
results = model.evaluate(test_gen,verbose=0)

print("test loss:{:.5f}".format(results[0]))
print("test loss:{:.5f}%".format(results[0]))"""

#predict the label of the test_gen
"""
pred = model.predict(test_gen)
pred= np.argmax(pred , axis =1)

#mapping the labels

labels = (train_gen.class_indices)
labels = dict((v,k) for k , v in labels.items())
pred = [labels[k] for k in pred]

y_test = list(test.label)
print(classification_report(y_test , pred))

fig, axes = plt.subplots(nrows=5 , ncols=2 , figsize=(12,8),subplot_kw ={'xticks':[],'yticks':[]})

for i , ax in enumerate(axes.flat):
    ax.imshow(plt.imread(test.Filepath.iloc[i]))
    ax.set_title(f"True:{test.Label.iloc[i]}\npredicted:{pred[i]}")
plt.tight_layot()
plt.show()
"""