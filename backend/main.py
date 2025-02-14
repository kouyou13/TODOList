from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn
import json
import random
import string


app = FastAPI()

origins = [
  'http://localhost:3000',
  'http://localhost:3001',
]

app.add_middleware(
  CORSMiddleware,
  allow_origins=origins,
  allow_credentials=True,
  allow_methods=['GET', 'POST', 'PUT', 'DELETE'],
  allow_headers=['*'],
)

import os

tasksJsonPath = './TodoList.json'
if not os.path.exists(tasksJsonPath):
  with open(tasksJsonPath, 'w') as file:
    json.dump([], file)

class AddItem(BaseModel):
  name: str
  limitDate: str

class UpdateItem(BaseModel):
  id: str
  achievement: str
  name: str
  limitDate: str

class DeleteItem(BaseModel):
  id: str

def generateRandomString(length: int):
  # 英字と数字を含む文字列を生成
  characters = string.ascii_letters + string.digits
  # ランダムな文字列を生成
  randomString = ''.join(random.choice(characters) for _ in range(length))
  randomString2 = ''.join(random.choice(characters) for _ in range(length))
  return f'{randomString}-{randomString2}'

@app.get('/')
def read_root():
  return 'test'

@app.get('/taskList')
def taskList():
  try:
    with open(tasksJsonPath, 'r') as file:
      return json.load(file)
  except:
    raise HTTPException(status_code=404, detail='Item not found')

@app.post('/addTask')
def addTask(item: AddItem):
  try:
    try:
      with open(tasksJsonPath, 'r') as file:
        datas = json.load(file)
    except:
      datas = []
    id = generateRandomString(10)
    datas.insert(0, {
      'id': id,
      'achievement': 'Not achieved',
      'name': item.name,
      'limitDate': item.limitDate,
    })
    with open(tasksJsonPath, 'w') as file:
      json.dump(datas, file)
    return {'message': 'Task added successfully'}

  except:
    raise HTTPException(status_code=504, detail='Item not found')

@app.post('/updateTask')
def updateTask(item: UpdateItem):
  try:
    with open(tasksJsonPath, 'r') as file:
      datas = json.load(file)
    for data in datas:
      if data['id'] == item.id:
        data['achievement'] = item.achievement
        data['name'] = item.name
        data['limitDate'] = item.limitDate
        break
    with open(tasksJsonPath, 'w') as file:
      json.dump(datas, file)
    return {'message': 'Task update successfully'}

  except:
    raise HTTPException(status_code=504, detail='Item not found')

@app.post('/deleteTask')
def deleteTask(item: DeleteItem):
  try:
    with open(tasksJsonPath, 'r') as file:
      datas = json.load(file)
    datas = [data for data in datas if data['id'] != item.id]
    with open(tasksJsonPath, 'w') as file:
      json.dump(datas, file)
    return {'message': 'Task delete successfully'}

  except:
    raise HTTPException(status_code=504, detail='Item not found')


if __name__ == '__main__':
  uvicorn.run(app, host='127.0.0.1', port=8000, log_level='debug')
