import {IsNotEmpty} from 'class-validator'
export class CreateTask{
@IsNotEmpty()
title: string;

@IsNotEmpty()
description: string;

}