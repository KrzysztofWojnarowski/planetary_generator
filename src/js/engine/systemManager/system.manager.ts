import { System } from "../interfaces/system.interface";
import { GameElement } from "../baseClasses/gameElement.class";
import { processedSystemComponents } from "./processedType";
import { stringIndexed } from "../interfaces/stringIndexed.interface";

export abstract class SystemManager {
    static systemRegistry: Array<System> = [];
    static delegated: { [K: string]: Array<GameElement> } = {};
    static componentRegistry:  { [K: string]: Array<GameElement> }={};

    static procesSystems(state: Array<GameElement>) {
        if (typeof state == "undefined") return;

        SystemManager.systemRegistry.forEach(system => {
            SystemManager.ProcessSystemComponent({ system: system, list: state });
        });
    }
    static processDelegates() {
        let delegated = SystemManager.delegated;
        Object.keys(delegated).forEach(systemName => {
            const processingSystem = SystemManager.getSystem(systemName);
            let state = delegated[systemName];
            state.forEach(element => {
                processingSystem.update(element, state);
            })
        });
        SystemManager.flushDelegates();
    }

    static register(system: System) {
        SystemManager.systemRegistry.push(system);
    }

    static assembleDelegates(system: System) {
        let delegationAgregate = SystemManager.delegated;
        const delegated = system.delegate();
        Object.keys(delegated).forEach(systemName => {
            if (typeof delegationAgregate[systemName] === "undefined") {
                delegationAgregate[systemName] = [];
            }
            delegationAgregate[systemName] = delegationAgregate[systemName].concat(delegated[systemName]);
        });
    }

    static flushDelegates() {
        SystemManager.delegated = {};
    }
    private static ProcessSystemComponent(systemComponent: processedSystemComponents) {
        systemComponent.list.forEach(element => {
            const system = systemComponent.system;
            system.handles.forEach(type => {
                if (element.objectType == type) {
                    system.setState(element);
                    SystemManager.assembleDelegates(system);
                    system.update(element, systemComponent.list);
                }
            })
        });
    }

    private static getSystem(constructorName: string): System {
        return SystemManager.systemRegistry.find(system => system.constructor.name === constructorName);
    }


    initComponentRegistry(systemList:Array<System>){
        systemList.forEach(system=>{
            system.handles.forEach(componentEntry=>{
                SystemManager.componentRegistry[componentEntry]=[];
            });    
        });
    }

    registerComponent(component:GameElement){
        if (typeof SystemManager.componentRegistry[component.objectType] == "object")
        SystemManager.componentRegistry[component.objectType].push(component);
    }






}