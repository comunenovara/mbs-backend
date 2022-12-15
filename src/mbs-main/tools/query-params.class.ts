export class QueryParamsTools {
    
    
    public static getPrismaOrderByArray(queryParams: any): any {
        let prismaOrderByArray: any[] = [];
        if(Array.isArray(queryParams.orderBy)) {
            queryParams.orderBy.forEach(order => {
                let o = order.split(",");
                let push = {
                    [o[0]]: o[1]
                };
                prismaOrderByArray.push(push);
            });
        } else {
            let o = queryParams.orderBy.split(",");
            let push = {
                [o[0]]: o[1]
            };
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


    // https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#filter-conditions-and-operators
	private static operators: string[] = ["equals", "not", "in", "notIn", "lt", "lte", "gt", "gte", "contains", "search", "startsWith", "endsWith"]

    public static getPrismaWhereObject(filters: any): any {
		let wheres: any = {};
		for (const key in filters) {
			let paramWhere = this.getSingleWhere(key);
			if(paramWhere === undefined) continue;
			wheres[paramWhere['value']] = {
				[paramWhere['key']]: filters[key],
				mode: 'insensitive',
			}
		}
		return wheres;
	}

    private static getSingleWhere(param: string) {
		let result = undefined;
		for(const operator of this.operators) {
			let op = operator.charAt(0).toUpperCase() + operator.slice(1);
			if(!param.includes(op)) {
				continue;
			}
			let val = param.split(op)[0];
			result = {
				key: operator,
				value: val
			}
			continue;
		}
		return result;
	}
}