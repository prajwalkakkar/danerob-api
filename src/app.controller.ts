import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }


  @Post('/createVesting')
  createVesting(@Body() data: any) {
    return this.appService.createVesting(data);
  }


  @Post('/claim')
  claim(@Body() data: any) {
    return this.appService.claimVesting(data);
  }


}
