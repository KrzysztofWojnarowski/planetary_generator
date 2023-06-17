export default class Effects{
    collisionEffect(objectA,objectB){
        let m1 = objectA.m;
        let m2 = objectB.m;
        let v1 = [objectA.vx,objectA.vy];
        let v2 = [objectB.vx,objectB.vy];
        let newMass =m1+m2;
        let newVelocity = [
            (v1[0]*m1+v2[0]*m2)/newMass,
            (v2[1]*m1+v2[1]*m2)/newMass
        ];
        return {
            m:newMass,
            v:[
                newVelocity[0],
                newVelocity[1]
            ]
        }
    }
}