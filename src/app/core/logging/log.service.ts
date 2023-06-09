import { Injectable } from '@angular/core';
import { AppConfig } from 'app/config/service.config';

export enum LogLevel {
    All = 0,
    Debug = 1,
    Info = 2,
    Warn = 3,
    Error = 4,
    Fatal = 5,
    Off = 6
}

@Injectable({
    providedIn: 'root'
})
export class LogService {

    level: LogLevel = LogLevel.All;
    logWithDate: boolean = true;
    
    constructor(
        private _appConfig: AppConfig,
    ){    
    }
        
    debug(msg: string, ...optionalParams: any[]) {
        this.writeToLog(msg, LogLevel.Debug, optionalParams);
    }

    info(msg: string, ...optionalParams: any[]) {
        this.writeToLog(msg, LogLevel.Info, optionalParams, '#2D88F3');
    }

    warn(msg: string, ...optionalParams: any[]) {
        this.writeToLog(msg, LogLevel.Warn, optionalParams, '#F1AB27');
    }

    error(msg: string, ...optionalParams: any[]) {
        this.writeToLog(msg, LogLevel.Error, optionalParams, '#96281b');
    }

    fatal(msg: string, ...optionalParams: any[]) {
        this.writeToLog(msg, LogLevel.Fatal, optionalParams, '#FF0000');
    }

    log(msg: string, ...optionalParams: any[]) {
        this.writeToLog(msg, LogLevel.All, optionalParams, '#1e8bc3');
    }

    loadLevel(){
        return this.level = this._appConfig.settings.logging;
    }

    private writeToLog(msg: string, level: LogLevel, params: any[], color?: string) {
        this.loadLevel();
        if (this.shouldLog(level)) {
            let value: string = "";
            
            // Build log string
            if (this.logWithDate) {
                value = new Date() + "\n";
            }
            
            value += " Type: " + LogLevel[this.level];
            if (params.length === 1) {
                value += "\n Extra Info: ";
                console.groupCollapsed(`%c ${msg}`, `color: ${color}`);
                console.log(`%c ${value}`, `color: ${color}`, params);
                console.groupEnd();
            } else {
                value += "\n Message: " + msg;
                if (params.length > 1) {
                    value += "\n Extra Info: " + this.formatParams(params);
                }
                console.log(`%c ${value}`, `color: ${color}`);
            }
            
            // Log the value
        }
    }

    private shouldLog(level: LogLevel): boolean {
        let ret: boolean = false;
        if ((level >= this.level && level !== LogLevel.Off) || this.level === LogLevel.All) {
            ret = true;
        }
        return ret;
    }

    private formatParams(params: any[]): string {
        let ret: string = params.join(",");
        
        // Is there at least one object in the array?
        if (params.some(p => typeof p == "object")) {
            ret = "";
            
            let i = 0;
            // Build comma-delimited string
            for (let item of params) {
                if (i==0)
                  ret += JSON.stringify(item);
                else
                  ret += "," + JSON.stringify(item);
                i++;
            }
        } 
        return ret;
    }
}

