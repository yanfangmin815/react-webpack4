export async function complexUpdate(type, moduleState, actionCtx){
    // await api.updateType(type);
    type = type * 200;
    return { type };
}

export async function complexUpdateTitle(title, moduleState, actionCtx){
    console.log(title, 'titles')
    return { title };
}

// title type 综合处理方法
export async function updateTypeAndTitle({type, title}, moduleState, actionCtx){
    await actionCtx.invoke(complexUpdate, type);
    await actionCtx.invoke(complexUpdateTitle, title);
}

