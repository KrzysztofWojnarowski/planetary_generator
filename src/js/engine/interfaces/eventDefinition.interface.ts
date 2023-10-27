export interface EventDefinition {
    eventName: string;
    shallTrigger(): boolean
}