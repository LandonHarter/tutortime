type SubjectFilter = {
    subjects: string[];
    any: any;
};

type Filters = {
    subjects?: SubjectFilter;
    any: any;
};

export default Filters;