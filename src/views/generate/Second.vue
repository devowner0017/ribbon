<template>
    <div class="flex flex-col grow">
        <MenuBar />
        <div
            :class="['w-full flex grow grid', { 'md:grid-cols-2 sm:gird-cols-1': isGenerating, 'md:grid-cols-1 sm:gird-cols-1': !isGenerating }]">
            <div
                :class="['relative md:flex flex-col grow justify-center items-center', { 'sm:hidden hidden': isGenerating, 'sm:flex flex': !isGenerating }]">
                <div class="form-content form-content-sm">
                    <div class="text-main-content mb-4 w-full">Given their situation, what would you request the learner do
                        next?
                    </div>
                    <div class="flex flex-col justify-center items-center">
                        <textarea class="text-area w-full" maxlength="500" v-model="question2"
                            placeholder="Book a meeting with me so we can figure out what’s going on."></textarea>
                        <p v-if="question2.length > 500" class="mt-2" style="color: red;">Limit text to 500 characters.</p>
                        <Button class="btn-primary mt-4" :onClick="draftClick" :disabled="isDisabled">
                            draft email
                        </Button>
                    </div>
                </div>
                <DisablePanel v-if="isGenerating" />
            </div>
            <LoadingPanel v-if="isGenerating" />
        </div>
        <FirstDraftModal :showModal="isModalVisible" @close="closeModal" :isGenerated="isGenerated" />
    </div>
</template>
<script>
import MenuBar from '../../components/MenuBar.vue';
import Button from '../../components/Button.vue';
import generateAnswer from '../../actions/generate';
import LoadingPanel from '../../components/utils/LoadingPanel.vue';
import DisablePanel from '../../components/utils/DisablePanel.vue';
import { PROMPT_ONE } from '../../prompts';
import FirstDraftModal from '../../components/utils/FirstDraftModal.vue';
export default {
    data() {
        return {
            question2: "",
            answer: "",
            isGenerating: false,
            isGenerated: false,
            isModalVisible: false,
        }
    },
    components: {
        MenuBar,
        Button,
        LoadingPanel,
        DisablePanel,
        FirstDraftModal
    },
    name: 'tow-question',
    methods: {
        redirectToPage() {
            //this.$router.push('/questions/3');
        },
        checkNext() {
            const question1 = this.$route.query.question1;
            if (this.isModalVisible === false && this.isGenerated === true) {
                this.$router.push({
                    path: '/questions/3',
                    query: {
                        question1: question1,
                        question2: this.question2,
                    }
                });
            }
        },
        draftClick() {
            const question1 = this.$route.query.question1;
            this.isGenerating = true;
            this.openModal();
            const prompt = PROMPT_ONE(question1, this.question2);
            this.answer = generateAnswer(prompt).then(async res => {
                this.isGenerating = false;
                this.isGenerated = true;
                this.$store.dispatch('setDraft1', res);
                this.$store.dispatch('setPrompt1', prompt);
                this.checkNext();
            }).catch(err => {
                this.isGenerating = false;
                console.log(err)
            });
        },
        openModal() {
            this.isModalVisible = true;
        },
        closeModal() {
            this.isModalVisible = false;
        },
    },
    watch: {
        isModalVisible(newValue, oldValue) {
            this.checkNext();
        }
    },
    computed: {
        isDisabled() {
            return this.question2 === '';
        }
    }

}
</script>
