import os
dirc = input(">>")
for (root,dirs,files) in os.walk(dirc, topdown=True):
    for file in files:
        path = root+"/"+file
        path = path.replace("\\", "/")
        path = "- "+path
        print (path)
input()
