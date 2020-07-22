import { Request, Response } from 'express'
import * as fs from 'fs';
const { v4: uuidv4 } = require('uuid');

var fileName = 'data.json';

export async function index(req: Request, res: Response){
  var data = await _readFile();
  var result:any = [];
  
  for(var item of data){
    result.push({
      name: item.name,
      note: item.note,
      status: await _converStatusToString(item.status),
    });
  };
  
  // return res.render('home', {                                                       
  //   tasks: result,
  // });
  return res.json({
    tasks: result
  })
}

export async function addTask(req: Request, res: Response){
  var { name, note } = req.body;
  await _writeFile({
    id: uuidv4(),
    name, 
    note,
    status: 1
  });
  return res.redirect('/');
}

export async function updateTask(req: Request, res: Response){
  var index: string = req.params.id;
  var newData =  {
    name: req.body.name,
    note: req.body.note,
    status: Number(req.body.status),
  };
  _updateTask(index, newData);
  return res.redirect(`/task/${index}`);
}

export async function getTaskDetail(req: Request, res: Response){
  var index:string = req.params.id;
  console.log(index);
  var task = await _getTaskByIndex(index);
  console.log(task);
  return res.json({
    id: task.id,
    name: task.name,
    note: task.note,
    status: await _converStatusToString(task.status)
  });
}

export async function deleteTask(req: Request, res: Response){
  var id: string = req.params.index;
  _deleteTask(id);
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
  return JSON.parse(data).data as { 
    id: string,
    name: string,
    note: string,
    status: number,
  }[];
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
async function _getTaskByIndex(id: string){
  var data = await _readFile();
  var result = await data.find(ele => ele.id == id);
  return result;
}

async function _updateTask(id:string, data: any){
  var oldData = await _readFile();
  var index:number = await oldData.findIndex((obj => obj.id == id));
  oldData[index].name = data.name;
  oldData[index].note = data.note;
  oldData[index].status = data.status;
  await fs.writeFileSync(fileName, JSON.stringify({ data: oldData }));
}

async function _deleteTask(id:string){
  var oldData = await _readFile();
  var index:number = await oldData.findIndex((obj => obj.id == id));
  console.log(index);
  if(index >= 0)
    oldData.splice(index, 1);
  await fs.writeFileSync(fileName, JSON.stringify({ data: oldData }));
}