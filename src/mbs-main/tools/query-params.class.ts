export class QueryParamsTools {
    
    
    public static getPrismaOrderByArray(queryParams: any): any {
        let prismaOrderByArray: any[] = [];
        if(Array.isArray(queryParams.orderBy)) {
            queryParams.orderBy.forEach(order => {
                let o = order.split(",");
                let push = {};
                push[o[0]] = o[1];
                prismaOrderByArray.push(push);
            });
        } else {
            let o = queryParams.orderBy.split(",");
            let push = {};
            push[o[0]] = o[1];
            prismaOrderByArray.push(push);
        }
        return prismaOrderByArray;
    }

    public static getPrismaPaginationObject(queryParams: any): any {
        let prismaPaginationObject: any = {};
        {
            prismaPaginationObject['take'] = +queryParams.size;
			prismaPaginationObject['skip'] = (queryParams.size * queryParams.page);
        }
        return prismaPaginationObject;
    }
}