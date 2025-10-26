import { getTarefasWithFilters, insertTarefa, updateTarefa } from '../repository/repository.js';

export const getTarefas = (queryParams, callback) => {
    getTarefasWithFilters(queryParams, callback);
}

export const createTarefa = (tarefaData, callback) => {
    insertTarefa(tarefaData, callback);
}

export const setTarefa = (queryParams, callback) => {
    updateTarefa(queryParams, callback);
}