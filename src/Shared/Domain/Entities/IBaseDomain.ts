export interface IBaseDomain extends ITimestamps
{
    getId(): string;
    setId(id: string): void;
}
export interface ITimestamps {
    createdAt: Date;
    updatedAt: Date;
}
