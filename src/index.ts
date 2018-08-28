import React from 'react'
import { autobind } from 'core-decorators';
import { observer, inject } from 'mobx-react';
import defaultTrackMethods from './defaultTrackMethods';
const AnalysisGather = require('./analysis');

interface TrackItem {
    methodName: string,
    description: string
}

interface TrackPattern {
    app?: string,
    version?: string,
    loginUser?: string,
    funcPath?: string
}

/**
 * 
 * @param {Array<{
            methodName: 'componentDidMount',
            description: 'pageload'
        }>} trackItems 
 * 
 * @param {{
        app : "y-saas-pbs",
        version : "1.0",
        loginUser : window.userPin,
        funcPath : ""
    }} trackPattern 
 * 
 */
export default function enableTrack(trackItems: TrackItem, trackPattern: TrackPattern): (component: React.ComponentType) => React.ComponentType {
    return function EnableTrackDecorator(component: React.ComponentType) {

        function getDisplayName(comp: React.ComponentType) {
            return comp.displayName || 
                comp.name || 
                'Component'
        }

        function attachTrack(item: TrackItem){
            const func = component.prototype[item.methodName];
            if(!func) return;

            component.prototype[item.methodName] = (...args: any[]) => {
                trackPattern.funcPath = item.description ? `${getDisplayName(component)}-${item.description}` : `${getDisplayName(component)}-${item.methodName}`
                AnalysisGather(trackPattern);
                func.apply(component, ...args);
            }
        }

        let methods: Array<TrackItem> = [];
        defaultTrackMethods.concat(trackItems).forEach(item => {
            if(methods.findIndex(m => m.methodName == item.methodName) == -1){
                methods.push(item)
            }
        })

        for(let item of methods){
            attachTrack(item)
        }

        return component
    }
}

