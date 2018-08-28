declare module 'defaultTrackMethods' {
	 const _default: {
	    methodName: string;
	    description: string;
	}[];
	export default _default;

}
declare module 'index' {
	import React from 'react';
	interface TrackItem {
	    methodName: string;
	    description: string;
	}
	interface TrackPattern {
	    app?: string;
	    version?: string;
	    loginUser?: string;
	    funcPath?: string;
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
	export default function enableTrack(trackItems: TrackItem, trackPattern: TrackPattern): (component: React.ComponentType) => React.ComponentType;
	export {};

}
