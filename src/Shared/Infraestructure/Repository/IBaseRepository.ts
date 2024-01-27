export interface IBaseRepository<T>
{
    save(element: T): Promise<T>;
    update(element: T): Promise<T>;
    getOne(condition: Record<string, any>): Promise<T>;
    getOneById(id: string): Promise<T>;
    // delete(id: string): Promise<T>;
}
