import React from 'react'
import { autobind } from 'core-decorators';
import { observer, inject } from 'mobx-react';
import AnalysisGather from './analysis';
import defaultTrackMethods from './defaultTrackMethods';

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
export default function enableTrack(trackItems, trackPattern) {
    return function EnableTrackDecorator(component) {

        function getDisplayName(comp) {
            return comp.displayName || 
                comp.name || 
                'Component'
        }

        function attachTrack(item){
            const func = component.prototype[item.methodName];
            if(!func) return;

            component.prototype[item.methodName] = (...args) => {
                trackPattern.funcPath = item.description ? `${getDisplayName(component)}-${item.description}` : `${getDisplayName(component)}-${item.methodName}`
                AnalysisGather(trackPattern);
                func.apply(component, ...args);
            }
        }

        let methods = [];
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

