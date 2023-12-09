export interface EventDefinition {
    eventName: string;
    triggerCondition(): boolean
}