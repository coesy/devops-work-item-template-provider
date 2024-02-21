import { IMock } from ".";

/**
 * {@inheritdoc IMock}
 */
export class InvocationTracker implements IMock {
    trackedInvocations: {methodName:string, methodArguments: any[]}[] = [];

    public constructor() {
        this.addInvocation = this.addInvocation.bind(this);
        this.getInvocationsT1 = this.getInvocationsT1.bind(this);
        this.getInvocationsT2 = this.getInvocationsT2.bind(this);
        this.getInvocationsT3 = this.getInvocationsT3.bind(this);
        this.getInvocationsT4 = this.getInvocationsT4.bind(this);
        this.getInvocationsT5 = this.getInvocationsT5.bind(this);
    }
    
    clearInvocations(): void {
        this.trackedInvocations = [];
    }

    protected addInvocation(methodName: string, methodArguments: any[]) {
        this.trackedInvocations.push({methodName:methodName, methodArguments: methodArguments});
    }

    getInvocationsT1<TFirstArgument>(memberName: string): { firstArgument: TFirstArgument; }[] {
        return this.trackedInvocations.filter(x => x.methodName === memberName && x.methodArguments.length >= 1).map(x => {
            return {
                firstArgument: x.methodArguments[0] as TFirstArgument
            };
        });
    }
    getInvocationsT2<TFirstArgument, TSecondArgument>(memberName: string): { firstArgument: TFirstArgument; secondArgument: TSecondArgument; }[] {
        return this.trackedInvocations.filter(x => x.methodName === memberName && x.methodArguments.length >= 2).map(x => {
            return {
                firstArgument: x.methodArguments[0] as TFirstArgument,
                secondArgument: x.methodArguments[1] as TSecondArgument
            };
        });
    }
    getInvocationsT3<TFirstArgument, TSecondArgument, TThirdArgument>(memberName: string): { firstArgument: TFirstArgument; secondArgument: TSecondArgument; thirdArgument: TThirdArgument; }[] {
        return this.trackedInvocations.filter(x => x.methodName === memberName && x.methodArguments.length >= 3).map(x => {
            return {
                firstArgument: x.methodArguments[0] as TFirstArgument,
                secondArgument: x.methodArguments[1] as TSecondArgument,
                thirdArgument: x.methodArguments[2] as TThirdArgument
            };
        });
    }
    getInvocationsT4<TFirstArgument, TSecondArgument, TThirdArgument, TForthArgument>(memberName: string): { firstArgument: TFirstArgument; secondArgument: TSecondArgument; thirdArgument: TThirdArgument; forthArgument: TForthArgument; }[] {
        return this.trackedInvocations.filter(x => x.methodName === memberName && x.methodArguments.length >= 4).map(x => {
            return {
                firstArgument: x.methodArguments[0] as TFirstArgument,
                secondArgument: x.methodArguments[1] as TSecondArgument,
                thirdArgument: x.methodArguments[2] as TThirdArgument,
                forthArgument: x.methodArguments[3] as TForthArgument
            };
        });
    }
    getInvocationsT5<TFirstArgument, TSecondArgument, TThirdArgument, TForthArgument, TFifthArgument>(memberName: string): { firstArgument: TFirstArgument; secondArgument: TSecondArgument; thirdArgument: TThirdArgument; forthArgument: TForthArgument; fifthArgument: TFifthArgument; }[] {
        return this.trackedInvocations.filter(x => x.methodName === memberName && x.methodArguments.length >= 5).map(x => {
            return {
                firstArgument: x.methodArguments[0] as TFirstArgument,
                secondArgument: x.methodArguments[1] as TSecondArgument,
                thirdArgument: x.methodArguments[2] as TThirdArgument,
                forthArgument: x.methodArguments[3] as TForthArgument,
                fifthArgument: x.methodArguments[4] as TFifthArgument
            };
        });
    }
}