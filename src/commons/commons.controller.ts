import { Body, Get, HttpCode, HttpStatus, Param, Post, UseGuards } from "@nestjs/common";
import { BaseService } from "./commons.service";
import { AuthGuard } from "src/auth/guard/auth.guard";

export abstract class BaseController<T> {

    abstract getService(): BaseService<T>;

    @Get('all')
    @UseGuards(AuthGuard)
    async findAll() : Promise<T[]> {
        return await this.getService().getRows();
    }

    @Get('find/:id')
    @UseGuards(AuthGuard)
    async findOne(@Param('id') id): Promise<T> {
        return await this.getService().getOne({
            where: {
                id: id,
            },
        });
    }

    @Post('save')
    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.CREATED)
    async save(@Body() entity: T) : Promise<T> {
        return await this.getService().save(entity);
    }

    @Post('save/many')
    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.CREATED)
    async saveMany(@Body() entities: T[]) : Promise<T[]> {
        return await this.getService().saveMany(entities);
    }

    @Post('delete/:id')
    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    async delete(@Param('id') id: any) {
        return this.getService().delete(id);
    }

    @Get('count')
    @UseGuards(AuthGuard)
    async count() : Promise<number> {
        return await this.getService().count();
    }
}