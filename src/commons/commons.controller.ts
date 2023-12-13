import { Body, Get, HttpCode, HttpStatus, Param, Post, UseGuards } from "@nestjs/common";
import { BaseService } from "./commons.service";
import { AuthGuard } from "src/auth/guard/auth.guard";
import { Roles } from "src/auth/decorators/roles.decorator";
import { RolesConstants } from "src/auth/constatns/roles.constants";
import { RolesGuard } from "src/auth/guard/roles.guard";

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
    @Roles(RolesConstants.SUPER_ADMIN)
    @UseGuards(AuthGuard,RolesGuard)
    @HttpCode(HttpStatus.CREATED)
    async save(@Body() entity: T) : Promise<T> {
        return await this.getService().save(entity);
    }

    @Post('save/many')
    @Roles(RolesConstants.SUPER_ADMIN)
    @UseGuards(AuthGuard,RolesGuard)
    @HttpCode(HttpStatus.CREATED)
    async saveMany(@Body() entities: T[]) : Promise<T[]> {
        return await this.getService().saveMany(entities);
    }

    @Post('delete/:id')
    @Roles(RolesConstants.SUPER_ADMIN)
    @UseGuards(AuthGuard,RolesGuard)
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