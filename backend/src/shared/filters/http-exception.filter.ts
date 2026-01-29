import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { DrizzleError, DrizzleQueryError } from 'drizzle-orm';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string | object = 'Internal server error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();
      message = typeof res === 'object' && res !== null && 'message' in res
        ? (res as { message: string | string[] }).message
        : (res as string);
    } else if (exception instanceof DrizzleQueryError) {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      this.logger.error(
        `DrizzleQueryError: ${exception.message} | query: ${exception.query} | params: ${JSON.stringify(exception.params)}`,
      );
      message = process.env.NODE_ENV === 'production'
        ? 'Database error. Check server logs.'
        : exception.message;
    } else if (exception instanceof DrizzleError) {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      this.logger.error(`DrizzleError: ${exception.message}`, exception.stack);
      message = process.env.NODE_ENV === 'production'
        ? 'Database error. Check server logs.'
        : exception.message;
    } else if (exception instanceof Error) {
      this.logger.error(exception.message, exception.stack);
      message = process.env.NODE_ENV === 'production'
        ? 'Internal server error'
        : exception.message;
    }

    response.status(status).json({
      statusCode: status,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
