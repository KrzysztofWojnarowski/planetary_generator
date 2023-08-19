export class PhysicalBody {
    x = 0;
    y = 0;
    r = 0;
    m = 0;
    vx = 0;
    vy = 0;
    fx = 0;
    fy = 0;

    fromObject(o: any) {
        Object.keys(o).forEach((e)=> (this as any)[e] = o[e]);
    }
}