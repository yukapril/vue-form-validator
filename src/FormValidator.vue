<template>
    <div>
        <div>
            <h2>On Input</h2>
            <input type="text" v-model="name">
            <span>
                <span v-if="!error.name.isRequired">please input</span>
                <span v-if="error.name.isRequired && !error.name.min">too short</span>
                <span v-if="error.name.isRequired && !error.name.max">too long</span>
                <span v-if="error.name.min && error.name.max && !error.name.regex">illegal</span>
            </span>
        </div>

        <br>

        <div>
            <h2>On Blur</h2>
            <input type="text" v-model.lazy="age">
            <span>
                <span v-if="!error.age.isRequired">please input</span>
                <span v-if="error.age.isRequired && !error.age.length">length must to be 2</span>
                <span v-if="error.age.length && !error.age.regex">regex illegal</span>
                <span v-if="error.age.length && error.age.regex && !error.age.fn">fn illegal</span>
            </span>
        </div>

        <div>
            <h2>All Check</h2>
            <button @click="handleClick()">check</button>
            <span>{{valid}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'FormValidator',
        data () {
            return {
                name: 'Jason',
                age: '12',
                valid: '',
                error: {}
            };
        },
        methods: {
            handleClick(){
                this.valid = this.error.$valid;
            }
        },
        created(){
            this.$validator(this.error, {
                name: {
                    model: 'name',
                    value: this.name,
                    isRequired: true,
                    regex: /^[A-Za-z]+$/,
                    max: 10,
                    min: 3
                },
                age: {
                    model: 'age',
                    value: this.age,
                    isRequired: true,
                    regex: /^\d+$/,
                    fn: (val) => {
                        return val <= 60;
                    },
                    length: 2
                }
            });
        }
    }
</script>

<style>

</style>
