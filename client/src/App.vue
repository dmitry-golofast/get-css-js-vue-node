<template>
    <div class="app">
        <form @submit.prevent>
            <h3>Web Service Get CSS/JS</h3>
            <input :value="input"
                   @input="input = $event.target.value"
                   class="input"
                   type="text"
                   placeholder="Введите адрес сайта. Например https://site.com" >
            <button class="btn"
                    @click="getData">Получить</button>
        </form>
        <div class="list" v-if="!isLoading">
            <div>
                <strong>CSS-files:</strong>
                <ul>
                    <li v-for="(file, index) in fileList.css" :key="index">{{ index + 1 }}. {{ file }}</li>
                </ul>
            </div>
            <div>
                <strong>JS-files:</strong>
                <ul>
                    <li v-for="(file, index) in fileList.js" :key="index">{{ index + 1 }}. {{ file }}</li>
                </ul>
            </div>
        </div>
        <div v-else>Идет загрузка...</div>
    </div>
</template>


<script>
    import axios from 'axios';
    export default {
        data() {
            return {
                input: '',
                isLoading: false,
                fileList: {
                    css: [],
                    js: []
                }
            }
        },
        methods: {
            async getData() {
                this.isLoading = true;
                this.fileList = { css: [], js: [] };
                this.port = 8081
                try {
                    const response = await axios.get(`http://localhost:${this.port}/getFiles?site=${this.input}`);
                    const { css, js } = response.data;
                    this.fileList.css = css;
                    this.fileList.js = js;
                    this.input = '';
                } catch (error) {
                    console.error(error);
                    alert('Произошла ошибка при получении данных!');
                } finally {
                    this.isLoading = false;
                }
            }
        }
    }
</script>

<style>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    .app {
        border: 1px solid darkgreen;
        margin: 15px;
        padding: 30px;
    }
    form {
        display: flex;
        flex-direction: column;
        width: 50rem;
    }
    .input {
        margin-top: 15px;
        width: 100%;
        border: 1px solid forestgreen;
        padding: 10px 15px;
    }
    .btn {
        margin-top: 15px;
        align-self: flex-end;
        padding: 10px 15px;
        background: none;
        color: forestgreen;
        border: 1px solid forestgreen;
    }
    .btn:hover {
        background: gainsboro;
    }
    .list{
        margin-top: 15px;
    }
</style>