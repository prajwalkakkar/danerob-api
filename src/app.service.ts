import { Injectable } from '@nestjs/common';
import { lockToken, unLockToken } from './solana/dev';

@Injectable()
export class AppService {
  getHello(): string {
    return 'SOLANA TOKEN VESTING';
  }


  async createVesting(data: any): Promise<any> {
    const { destinationToken, destinationOwner, amount, schedules } = data;
    return await lockToken(
      destinationToken,
      destinationOwner,
      amount,
      schedules,
    );
  }
  async claimVesting(data: any): Promise<any> {
    const { seed } = data;
    console.log(seed,"seed")
    try {
      const res = await unLockToken(seed);
      return res;
    } catch (err) {
      return { msg: JSON.stringify(err) };
    }

  }
}
