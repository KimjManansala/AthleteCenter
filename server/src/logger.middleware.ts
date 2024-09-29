import { Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

export function logger(req: Request, res: Response, next: NextFunction) {
  Logger.log(`Request: ${req.method} ${req.url}`);
  next();
}
