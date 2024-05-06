import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { Response } from "express";
import { findPrismaErrorInfo } from "prisma-common-error-handle";


@Catch(PrismaClientKnownRequestError)
export default class PrismaFilter implements ExceptionFilter {
    catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost) {
        const res: Response = host.switchToHttp().getResponse()
        const { message, status } = findPrismaErrorInfo(exception)

        res.status(status).json({
            message
        });

    }

}