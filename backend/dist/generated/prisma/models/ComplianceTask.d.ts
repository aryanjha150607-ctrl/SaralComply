import type * as runtime from "@prisma/client/runtime/library";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model ComplianceTask
 *
 */
export type ComplianceTaskModel = runtime.Types.Result.DefaultSelection<Prisma.$ComplianceTaskPayload>;
export type AggregateComplianceTask = {
    _count: ComplianceTaskCountAggregateOutputType | null;
    _avg: ComplianceTaskAvgAggregateOutputType | null;
    _sum: ComplianceTaskSumAggregateOutputType | null;
    _min: ComplianceTaskMinAggregateOutputType | null;
    _max: ComplianceTaskMaxAggregateOutputType | null;
};
export type ComplianceTaskAvgAggregateOutputType = {
    id: number | null;
};
export type ComplianceTaskSumAggregateOutputType = {
    id: number | null;
};
export type ComplianceTaskMinAggregateOutputType = {
    id: number | null;
    title: string | null;
    status: string | null;
    dueDate: Date | null;
    severity: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ComplianceTaskMaxAggregateOutputType = {
    id: number | null;
    title: string | null;
    status: string | null;
    dueDate: Date | null;
    severity: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ComplianceTaskCountAggregateOutputType = {
    id: number;
    title: number;
    status: number;
    dueDate: number;
    severity: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type ComplianceTaskAvgAggregateInputType = {
    id?: true;
};
export type ComplianceTaskSumAggregateInputType = {
    id?: true;
};
export type ComplianceTaskMinAggregateInputType = {
    id?: true;
    title?: true;
    status?: true;
    dueDate?: true;
    severity?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ComplianceTaskMaxAggregateInputType = {
    id?: true;
    title?: true;
    status?: true;
    dueDate?: true;
    severity?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ComplianceTaskCountAggregateInputType = {
    id?: true;
    title?: true;
    status?: true;
    dueDate?: true;
    severity?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type ComplianceTaskAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which ComplianceTask to aggregate.
     */
    where?: Prisma.ComplianceTaskWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ComplianceTasks to fetch.
     */
    orderBy?: Prisma.ComplianceTaskOrderByWithRelationInput | Prisma.ComplianceTaskOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.ComplianceTaskWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ComplianceTasks from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ComplianceTasks.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned ComplianceTasks
    **/
    _count?: true | ComplianceTaskCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: ComplianceTaskAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: ComplianceTaskSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: ComplianceTaskMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: ComplianceTaskMaxAggregateInputType;
};
export type GetComplianceTaskAggregateType<T extends ComplianceTaskAggregateArgs> = {
    [P in keyof T & keyof AggregateComplianceTask]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateComplianceTask[P]> : Prisma.GetScalarType<T[P], AggregateComplianceTask[P]>;
};
export type ComplianceTaskGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ComplianceTaskWhereInput;
    orderBy?: Prisma.ComplianceTaskOrderByWithAggregationInput | Prisma.ComplianceTaskOrderByWithAggregationInput[];
    by: Prisma.ComplianceTaskScalarFieldEnum[] | Prisma.ComplianceTaskScalarFieldEnum;
    having?: Prisma.ComplianceTaskScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ComplianceTaskCountAggregateInputType | true;
    _avg?: ComplianceTaskAvgAggregateInputType;
    _sum?: ComplianceTaskSumAggregateInputType;
    _min?: ComplianceTaskMinAggregateInputType;
    _max?: ComplianceTaskMaxAggregateInputType;
};
export type ComplianceTaskGroupByOutputType = {
    id: number;
    title: string;
    status: string;
    dueDate: Date;
    severity: string;
    createdAt: Date;
    updatedAt: Date;
    _count: ComplianceTaskCountAggregateOutputType | null;
    _avg: ComplianceTaskAvgAggregateOutputType | null;
    _sum: ComplianceTaskSumAggregateOutputType | null;
    _min: ComplianceTaskMinAggregateOutputType | null;
    _max: ComplianceTaskMaxAggregateOutputType | null;
};
type GetComplianceTaskGroupByPayload<T extends ComplianceTaskGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ComplianceTaskGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ComplianceTaskGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ComplianceTaskGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ComplianceTaskGroupByOutputType[P]>;
}>>;
export type ComplianceTaskWhereInput = {
    AND?: Prisma.ComplianceTaskWhereInput | Prisma.ComplianceTaskWhereInput[];
    OR?: Prisma.ComplianceTaskWhereInput[];
    NOT?: Prisma.ComplianceTaskWhereInput | Prisma.ComplianceTaskWhereInput[];
    id?: Prisma.IntFilter<"ComplianceTask"> | number;
    title?: Prisma.StringFilter<"ComplianceTask"> | string;
    status?: Prisma.StringFilter<"ComplianceTask"> | string;
    dueDate?: Prisma.DateTimeFilter<"ComplianceTask"> | Date | string;
    severity?: Prisma.StringFilter<"ComplianceTask"> | string;
    createdAt?: Prisma.DateTimeFilter<"ComplianceTask"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"ComplianceTask"> | Date | string;
};
export type ComplianceTaskOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    dueDate?: Prisma.SortOrder;
    severity?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ComplianceTaskWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    AND?: Prisma.ComplianceTaskWhereInput | Prisma.ComplianceTaskWhereInput[];
    OR?: Prisma.ComplianceTaskWhereInput[];
    NOT?: Prisma.ComplianceTaskWhereInput | Prisma.ComplianceTaskWhereInput[];
    title?: Prisma.StringFilter<"ComplianceTask"> | string;
    status?: Prisma.StringFilter<"ComplianceTask"> | string;
    dueDate?: Prisma.DateTimeFilter<"ComplianceTask"> | Date | string;
    severity?: Prisma.StringFilter<"ComplianceTask"> | string;
    createdAt?: Prisma.DateTimeFilter<"ComplianceTask"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"ComplianceTask"> | Date | string;
}, "id">;
export type ComplianceTaskOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    dueDate?: Prisma.SortOrder;
    severity?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.ComplianceTaskCountOrderByAggregateInput;
    _avg?: Prisma.ComplianceTaskAvgOrderByAggregateInput;
    _max?: Prisma.ComplianceTaskMaxOrderByAggregateInput;
    _min?: Prisma.ComplianceTaskMinOrderByAggregateInput;
    _sum?: Prisma.ComplianceTaskSumOrderByAggregateInput;
};
export type ComplianceTaskScalarWhereWithAggregatesInput = {
    AND?: Prisma.ComplianceTaskScalarWhereWithAggregatesInput | Prisma.ComplianceTaskScalarWhereWithAggregatesInput[];
    OR?: Prisma.ComplianceTaskScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ComplianceTaskScalarWhereWithAggregatesInput | Prisma.ComplianceTaskScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"ComplianceTask"> | number;
    title?: Prisma.StringWithAggregatesFilter<"ComplianceTask"> | string;
    status?: Prisma.StringWithAggregatesFilter<"ComplianceTask"> | string;
    dueDate?: Prisma.DateTimeWithAggregatesFilter<"ComplianceTask"> | Date | string;
    severity?: Prisma.StringWithAggregatesFilter<"ComplianceTask"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"ComplianceTask"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"ComplianceTask"> | Date | string;
};
export type ComplianceTaskCreateInput = {
    title: string;
    status: string;
    dueDate: Date | string;
    severity?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ComplianceTaskUncheckedCreateInput = {
    id?: number;
    title: string;
    status: string;
    dueDate: Date | string;
    severity?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ComplianceTaskUpdateInput = {
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    severity?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ComplianceTaskUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    severity?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ComplianceTaskCreateManyInput = {
    id?: number;
    title: string;
    status: string;
    dueDate: Date | string;
    severity?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ComplianceTaskUpdateManyMutationInput = {
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    severity?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ComplianceTaskUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    severity?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ComplianceTaskCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    dueDate?: Prisma.SortOrder;
    severity?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ComplianceTaskAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
};
export type ComplianceTaskMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    dueDate?: Prisma.SortOrder;
    severity?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ComplianceTaskMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    dueDate?: Prisma.SortOrder;
    severity?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ComplianceTaskSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
};
export type StringFieldUpdateOperationsInput = {
    set?: string;
};
export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
};
export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type ComplianceTaskSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    title?: boolean;
    status?: boolean;
    dueDate?: boolean;
    severity?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["complianceTask"]>;
export type ComplianceTaskSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    title?: boolean;
    status?: boolean;
    dueDate?: boolean;
    severity?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["complianceTask"]>;
export type ComplianceTaskSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    title?: boolean;
    status?: boolean;
    dueDate?: boolean;
    severity?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["complianceTask"]>;
export type ComplianceTaskSelectScalar = {
    id?: boolean;
    title?: boolean;
    status?: boolean;
    dueDate?: boolean;
    severity?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type ComplianceTaskOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "title" | "status" | "dueDate" | "severity" | "createdAt" | "updatedAt", ExtArgs["result"]["complianceTask"]>;
export type $ComplianceTaskPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "ComplianceTask";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        title: string;
        status: string;
        dueDate: Date;
        severity: string;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["complianceTask"]>;
    composites: {};
};
export type ComplianceTaskGetPayload<S extends boolean | null | undefined | ComplianceTaskDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ComplianceTaskPayload, S>;
export type ComplianceTaskCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ComplianceTaskFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ComplianceTaskCountAggregateInputType | true;
};
export interface ComplianceTaskDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['ComplianceTask'];
        meta: {
            name: 'ComplianceTask';
        };
    };
    /**
     * Find zero or one ComplianceTask that matches the filter.
     * @param {ComplianceTaskFindUniqueArgs} args - Arguments to find a ComplianceTask
     * @example
     * // Get one ComplianceTask
     * const complianceTask = await prisma.complianceTask.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ComplianceTaskFindUniqueArgs>(args: Prisma.SelectSubset<T, ComplianceTaskFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ComplianceTaskClient<runtime.Types.Result.GetResult<Prisma.$ComplianceTaskPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one ComplianceTask that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ComplianceTaskFindUniqueOrThrowArgs} args - Arguments to find a ComplianceTask
     * @example
     * // Get one ComplianceTask
     * const complianceTask = await prisma.complianceTask.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ComplianceTaskFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ComplianceTaskFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ComplianceTaskClient<runtime.Types.Result.GetResult<Prisma.$ComplianceTaskPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first ComplianceTask that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplianceTaskFindFirstArgs} args - Arguments to find a ComplianceTask
     * @example
     * // Get one ComplianceTask
     * const complianceTask = await prisma.complianceTask.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ComplianceTaskFindFirstArgs>(args?: Prisma.SelectSubset<T, ComplianceTaskFindFirstArgs<ExtArgs>>): Prisma.Prisma__ComplianceTaskClient<runtime.Types.Result.GetResult<Prisma.$ComplianceTaskPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first ComplianceTask that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplianceTaskFindFirstOrThrowArgs} args - Arguments to find a ComplianceTask
     * @example
     * // Get one ComplianceTask
     * const complianceTask = await prisma.complianceTask.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ComplianceTaskFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ComplianceTaskFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ComplianceTaskClient<runtime.Types.Result.GetResult<Prisma.$ComplianceTaskPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more ComplianceTasks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplianceTaskFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ComplianceTasks
     * const complianceTasks = await prisma.complianceTask.findMany()
     *
     * // Get first 10 ComplianceTasks
     * const complianceTasks = await prisma.complianceTask.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const complianceTaskWithIdOnly = await prisma.complianceTask.findMany({ select: { id: true } })
     *
     */
    findMany<T extends ComplianceTaskFindManyArgs>(args?: Prisma.SelectSubset<T, ComplianceTaskFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ComplianceTaskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a ComplianceTask.
     * @param {ComplianceTaskCreateArgs} args - Arguments to create a ComplianceTask.
     * @example
     * // Create one ComplianceTask
     * const ComplianceTask = await prisma.complianceTask.create({
     *   data: {
     *     // ... data to create a ComplianceTask
     *   }
     * })
     *
     */
    create<T extends ComplianceTaskCreateArgs>(args: Prisma.SelectSubset<T, ComplianceTaskCreateArgs<ExtArgs>>): Prisma.Prisma__ComplianceTaskClient<runtime.Types.Result.GetResult<Prisma.$ComplianceTaskPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many ComplianceTasks.
     * @param {ComplianceTaskCreateManyArgs} args - Arguments to create many ComplianceTasks.
     * @example
     * // Create many ComplianceTasks
     * const complianceTask = await prisma.complianceTask.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends ComplianceTaskCreateManyArgs>(args?: Prisma.SelectSubset<T, ComplianceTaskCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many ComplianceTasks and returns the data saved in the database.
     * @param {ComplianceTaskCreateManyAndReturnArgs} args - Arguments to create many ComplianceTasks.
     * @example
     * // Create many ComplianceTasks
     * const complianceTask = await prisma.complianceTask.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many ComplianceTasks and only return the `id`
     * const complianceTaskWithIdOnly = await prisma.complianceTask.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends ComplianceTaskCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ComplianceTaskCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ComplianceTaskPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a ComplianceTask.
     * @param {ComplianceTaskDeleteArgs} args - Arguments to delete one ComplianceTask.
     * @example
     * // Delete one ComplianceTask
     * const ComplianceTask = await prisma.complianceTask.delete({
     *   where: {
     *     // ... filter to delete one ComplianceTask
     *   }
     * })
     *
     */
    delete<T extends ComplianceTaskDeleteArgs>(args: Prisma.SelectSubset<T, ComplianceTaskDeleteArgs<ExtArgs>>): Prisma.Prisma__ComplianceTaskClient<runtime.Types.Result.GetResult<Prisma.$ComplianceTaskPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one ComplianceTask.
     * @param {ComplianceTaskUpdateArgs} args - Arguments to update one ComplianceTask.
     * @example
     * // Update one ComplianceTask
     * const complianceTask = await prisma.complianceTask.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends ComplianceTaskUpdateArgs>(args: Prisma.SelectSubset<T, ComplianceTaskUpdateArgs<ExtArgs>>): Prisma.Prisma__ComplianceTaskClient<runtime.Types.Result.GetResult<Prisma.$ComplianceTaskPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more ComplianceTasks.
     * @param {ComplianceTaskDeleteManyArgs} args - Arguments to filter ComplianceTasks to delete.
     * @example
     * // Delete a few ComplianceTasks
     * const { count } = await prisma.complianceTask.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends ComplianceTaskDeleteManyArgs>(args?: Prisma.SelectSubset<T, ComplianceTaskDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more ComplianceTasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplianceTaskUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ComplianceTasks
     * const complianceTask = await prisma.complianceTask.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends ComplianceTaskUpdateManyArgs>(args: Prisma.SelectSubset<T, ComplianceTaskUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more ComplianceTasks and returns the data updated in the database.
     * @param {ComplianceTaskUpdateManyAndReturnArgs} args - Arguments to update many ComplianceTasks.
     * @example
     * // Update many ComplianceTasks
     * const complianceTask = await prisma.complianceTask.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more ComplianceTasks and only return the `id`
     * const complianceTaskWithIdOnly = await prisma.complianceTask.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends ComplianceTaskUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ComplianceTaskUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ComplianceTaskPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one ComplianceTask.
     * @param {ComplianceTaskUpsertArgs} args - Arguments to update or create a ComplianceTask.
     * @example
     * // Update or create a ComplianceTask
     * const complianceTask = await prisma.complianceTask.upsert({
     *   create: {
     *     // ... data to create a ComplianceTask
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ComplianceTask we want to update
     *   }
     * })
     */
    upsert<T extends ComplianceTaskUpsertArgs>(args: Prisma.SelectSubset<T, ComplianceTaskUpsertArgs<ExtArgs>>): Prisma.Prisma__ComplianceTaskClient<runtime.Types.Result.GetResult<Prisma.$ComplianceTaskPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of ComplianceTasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplianceTaskCountArgs} args - Arguments to filter ComplianceTasks to count.
     * @example
     * // Count the number of ComplianceTasks
     * const count = await prisma.complianceTask.count({
     *   where: {
     *     // ... the filter for the ComplianceTasks we want to count
     *   }
     * })
    **/
    count<T extends ComplianceTaskCountArgs>(args?: Prisma.Subset<T, ComplianceTaskCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ComplianceTaskCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a ComplianceTask.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplianceTaskAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ComplianceTaskAggregateArgs>(args: Prisma.Subset<T, ComplianceTaskAggregateArgs>): Prisma.PrismaPromise<GetComplianceTaskAggregateType<T>>;
    /**
     * Group by ComplianceTask.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplianceTaskGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
    **/
    groupBy<T extends ComplianceTaskGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ComplianceTaskGroupByArgs['orderBy'];
    } : {
        orderBy?: ComplianceTaskGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ComplianceTaskGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetComplianceTaskGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the ComplianceTask model
     */
    readonly fields: ComplianceTaskFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for ComplianceTask.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__ComplianceTaskClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
/**
 * Fields of the ComplianceTask model
 */
export interface ComplianceTaskFieldRefs {
    readonly id: Prisma.FieldRef<"ComplianceTask", 'Int'>;
    readonly title: Prisma.FieldRef<"ComplianceTask", 'String'>;
    readonly status: Prisma.FieldRef<"ComplianceTask", 'String'>;
    readonly dueDate: Prisma.FieldRef<"ComplianceTask", 'DateTime'>;
    readonly severity: Prisma.FieldRef<"ComplianceTask", 'String'>;
    readonly createdAt: Prisma.FieldRef<"ComplianceTask", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"ComplianceTask", 'DateTime'>;
}
/**
 * ComplianceTask findUnique
 */
export type ComplianceTaskFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplianceTask
     */
    select?: Prisma.ComplianceTaskSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ComplianceTask
     */
    omit?: Prisma.ComplianceTaskOmit<ExtArgs> | null;
    /**
     * Filter, which ComplianceTask to fetch.
     */
    where: Prisma.ComplianceTaskWhereUniqueInput;
};
/**
 * ComplianceTask findUniqueOrThrow
 */
export type ComplianceTaskFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplianceTask
     */
    select?: Prisma.ComplianceTaskSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ComplianceTask
     */
    omit?: Prisma.ComplianceTaskOmit<ExtArgs> | null;
    /**
     * Filter, which ComplianceTask to fetch.
     */
    where: Prisma.ComplianceTaskWhereUniqueInput;
};
/**
 * ComplianceTask findFirst
 */
export type ComplianceTaskFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplianceTask
     */
    select?: Prisma.ComplianceTaskSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ComplianceTask
     */
    omit?: Prisma.ComplianceTaskOmit<ExtArgs> | null;
    /**
     * Filter, which ComplianceTask to fetch.
     */
    where?: Prisma.ComplianceTaskWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ComplianceTasks to fetch.
     */
    orderBy?: Prisma.ComplianceTaskOrderByWithRelationInput | Prisma.ComplianceTaskOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for ComplianceTasks.
     */
    cursor?: Prisma.ComplianceTaskWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ComplianceTasks from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ComplianceTasks.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of ComplianceTasks.
     */
    distinct?: Prisma.ComplianceTaskScalarFieldEnum | Prisma.ComplianceTaskScalarFieldEnum[];
};
/**
 * ComplianceTask findFirstOrThrow
 */
export type ComplianceTaskFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplianceTask
     */
    select?: Prisma.ComplianceTaskSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ComplianceTask
     */
    omit?: Prisma.ComplianceTaskOmit<ExtArgs> | null;
    /**
     * Filter, which ComplianceTask to fetch.
     */
    where?: Prisma.ComplianceTaskWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ComplianceTasks to fetch.
     */
    orderBy?: Prisma.ComplianceTaskOrderByWithRelationInput | Prisma.ComplianceTaskOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for ComplianceTasks.
     */
    cursor?: Prisma.ComplianceTaskWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ComplianceTasks from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ComplianceTasks.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of ComplianceTasks.
     */
    distinct?: Prisma.ComplianceTaskScalarFieldEnum | Prisma.ComplianceTaskScalarFieldEnum[];
};
/**
 * ComplianceTask findMany
 */
export type ComplianceTaskFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplianceTask
     */
    select?: Prisma.ComplianceTaskSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ComplianceTask
     */
    omit?: Prisma.ComplianceTaskOmit<ExtArgs> | null;
    /**
     * Filter, which ComplianceTasks to fetch.
     */
    where?: Prisma.ComplianceTaskWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ComplianceTasks to fetch.
     */
    orderBy?: Prisma.ComplianceTaskOrderByWithRelationInput | Prisma.ComplianceTaskOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing ComplianceTasks.
     */
    cursor?: Prisma.ComplianceTaskWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ComplianceTasks from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ComplianceTasks.
     */
    skip?: number;
    distinct?: Prisma.ComplianceTaskScalarFieldEnum | Prisma.ComplianceTaskScalarFieldEnum[];
};
/**
 * ComplianceTask create
 */
export type ComplianceTaskCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplianceTask
     */
    select?: Prisma.ComplianceTaskSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ComplianceTask
     */
    omit?: Prisma.ComplianceTaskOmit<ExtArgs> | null;
    /**
     * The data needed to create a ComplianceTask.
     */
    data: Prisma.XOR<Prisma.ComplianceTaskCreateInput, Prisma.ComplianceTaskUncheckedCreateInput>;
};
/**
 * ComplianceTask createMany
 */
export type ComplianceTaskCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many ComplianceTasks.
     */
    data: Prisma.ComplianceTaskCreateManyInput | Prisma.ComplianceTaskCreateManyInput[];
};
/**
 * ComplianceTask createManyAndReturn
 */
export type ComplianceTaskCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplianceTask
     */
    select?: Prisma.ComplianceTaskSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the ComplianceTask
     */
    omit?: Prisma.ComplianceTaskOmit<ExtArgs> | null;
    /**
     * The data used to create many ComplianceTasks.
     */
    data: Prisma.ComplianceTaskCreateManyInput | Prisma.ComplianceTaskCreateManyInput[];
};
/**
 * ComplianceTask update
 */
export type ComplianceTaskUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplianceTask
     */
    select?: Prisma.ComplianceTaskSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ComplianceTask
     */
    omit?: Prisma.ComplianceTaskOmit<ExtArgs> | null;
    /**
     * The data needed to update a ComplianceTask.
     */
    data: Prisma.XOR<Prisma.ComplianceTaskUpdateInput, Prisma.ComplianceTaskUncheckedUpdateInput>;
    /**
     * Choose, which ComplianceTask to update.
     */
    where: Prisma.ComplianceTaskWhereUniqueInput;
};
/**
 * ComplianceTask updateMany
 */
export type ComplianceTaskUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update ComplianceTasks.
     */
    data: Prisma.XOR<Prisma.ComplianceTaskUpdateManyMutationInput, Prisma.ComplianceTaskUncheckedUpdateManyInput>;
    /**
     * Filter which ComplianceTasks to update
     */
    where?: Prisma.ComplianceTaskWhereInput;
    /**
     * Limit how many ComplianceTasks to update.
     */
    limit?: number;
};
/**
 * ComplianceTask updateManyAndReturn
 */
export type ComplianceTaskUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplianceTask
     */
    select?: Prisma.ComplianceTaskSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the ComplianceTask
     */
    omit?: Prisma.ComplianceTaskOmit<ExtArgs> | null;
    /**
     * The data used to update ComplianceTasks.
     */
    data: Prisma.XOR<Prisma.ComplianceTaskUpdateManyMutationInput, Prisma.ComplianceTaskUncheckedUpdateManyInput>;
    /**
     * Filter which ComplianceTasks to update
     */
    where?: Prisma.ComplianceTaskWhereInput;
    /**
     * Limit how many ComplianceTasks to update.
     */
    limit?: number;
};
/**
 * ComplianceTask upsert
 */
export type ComplianceTaskUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplianceTask
     */
    select?: Prisma.ComplianceTaskSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ComplianceTask
     */
    omit?: Prisma.ComplianceTaskOmit<ExtArgs> | null;
    /**
     * The filter to search for the ComplianceTask to update in case it exists.
     */
    where: Prisma.ComplianceTaskWhereUniqueInput;
    /**
     * In case the ComplianceTask found by the `where` argument doesn't exist, create a new ComplianceTask with this data.
     */
    create: Prisma.XOR<Prisma.ComplianceTaskCreateInput, Prisma.ComplianceTaskUncheckedCreateInput>;
    /**
     * In case the ComplianceTask was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.ComplianceTaskUpdateInput, Prisma.ComplianceTaskUncheckedUpdateInput>;
};
/**
 * ComplianceTask delete
 */
export type ComplianceTaskDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplianceTask
     */
    select?: Prisma.ComplianceTaskSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ComplianceTask
     */
    omit?: Prisma.ComplianceTaskOmit<ExtArgs> | null;
    /**
     * Filter which ComplianceTask to delete.
     */
    where: Prisma.ComplianceTaskWhereUniqueInput;
};
/**
 * ComplianceTask deleteMany
 */
export type ComplianceTaskDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which ComplianceTasks to delete
     */
    where?: Prisma.ComplianceTaskWhereInput;
    /**
     * Limit how many ComplianceTasks to delete.
     */
    limit?: number;
};
/**
 * ComplianceTask without action
 */
export type ComplianceTaskDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplianceTask
     */
    select?: Prisma.ComplianceTaskSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ComplianceTask
     */
    omit?: Prisma.ComplianceTaskOmit<ExtArgs> | null;
};
export {};
//# sourceMappingURL=ComplianceTask.d.ts.map