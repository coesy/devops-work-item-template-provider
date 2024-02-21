/**
 * Represents an object which tracks invocations.
 */
export interface IMock {
    /**
     * Clears all invocations from the current instance.
     */
    clearInvocations(): void;
    /**
     * Returns type cast arguments for invocations to memberName. 
     */
    getInvocationsT1<TFirstArgument>(memberName: string): {firstArgument:TFirstArgument}[];
    /**
     * Returns type cast arguments for invocations to memberName.
     */
    getInvocationsT2<TFirstArgument, TSecondArgument>(memberName: string): {firstArgument:TFirstArgument,secondArgument:TSecondArgument}[];
    /**
     * Returns type cast arguments for invocations to memberName.
     */
    getInvocationsT3<TFirstArgument, TSecondArgument, TThirdArgument>(memberName: string): {firstArgument:TFirstArgument,secondArgument:TSecondArgument,thirdArgument:TThirdArgument}[];
    /**
     * Returns type cast arguments for invocations to memberName.
     */
    getInvocationsT4<TFirstArgument, TSecondArgument, TThirdArgument, TForthArgument>(memberName: string): {firstArgument:TFirstArgument,secondArgument:TSecondArgument,thirdArgument:TThirdArgument,forthArgument:TForthArgument}[];
    /**
     * Returns type cast arguments for invocations to memberName.
     */
    getInvocationsT5<TFirstArgument, TSecondArgument, TThirdArgument, TForthArgument, TFifthArgument>(memberName: string): {firstArgument:TFirstArgument,secondArgument:TSecondArgument,thirdArgument:TThirdArgument,forthArgument:TForthArgument, fifthArgument:TFifthArgument}[];
}