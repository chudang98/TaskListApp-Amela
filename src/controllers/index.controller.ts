import { Request, Response } from 'express'
import * as fs from 'fs';

var fileName = 'data.json';

export async function indexController(req: Request, res: Response){
  var data = await _readFile();
  var result:any = [];
  
  for(var item of data){
    result.push({
      name: item.name,
      note: item.note,
      status: await _converStatusToString(item.status),
    });
  };
  
  return res.render('home', {
    tasks: result,
  });
}

export async function addTask(req: Request, res: Response){
  var { name, note } = req.body;
  await _writeFile({name, note, status:1})
  return res.redirect('/');
}

export async function updateTask(req: Request, res: Response){
  var index:any = req.params.index;
  var newData =  {
    name: req.body.name,
    note: req.body.note,
    status: Number(req.body.status),
  };
  _updateTask(Number(index), newData);
  return res.redirect(`/detailTask/${Number(index)}`);
}

export async function getTaskDetail(req: Request, res: Response){
  var index:any = req.params.index;
  var task = await _getTaskByIndex(Number(index));
  return res.render('detail', {
    task,
    index: Number(index),
  })
}

export async function deleteTask(req: Request, res: Response){
  var index = req.params.index;
  _deleteTask(Number(index));
  return res.redirect('/');
}

async function _writeFile(data:any){
  var oldData = await _readFile();
  oldData.push(data);
  await fs.writeFileSync(fileName, JSON.stringify({ data: oldData }));
}

async function _readFile(){
  var data = await fs.readFileSync(fileName).toString();
  if(!data)
    return [];
  return JSON.parse(data).data;
}

async function _converStatusToString(idStatus: number){
  switch(idStatus){
    case 1 : {
      return 'open';
    };
    case 2 : {
      return 'inprogress';
    };
    case 3 : {
      return 'done';
    }
  }
}

async function _convertStringStatusToNumber(status: string){
  switch(status){
    case 'open': {
      return 1;
    };
    case 'inprogress': {
      return 2;
    };
    case 'done': {
      return 3;
    }
  }
}

// index start from zero
async function _getTaskByIndex(index: number){
  var oldData = await _readFile();
  return oldData[index];
}

async function _updateTask(index:number, data: any){
  var oldData = await _readFile();
  oldData[index] = data;
  await fs.writeFileSync(fileName, JSON.stringify({ data: oldData }));
}

async function _deleteTask(index:number){
  var oldData = await _readFile();
  oldData.splice(index, 1);
  await fs.writeFileSync(fileName, JSON.stringify({ data: oldData }));
}