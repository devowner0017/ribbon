<template>
    <div class="flex flex-col grow">
        <MenuBar />
        <div class="w-full flex grow grid md:grid-cols-2 sm:gird-cols-1 ">
            <div class="relative md:flex flex-col grow w-full justify-center items-center hidden">
                <div class="form-content form-content-md form-content-sd form-content-sm">
                    <div class="text-main-content mb-4 w-full">The messaging has been updated for a learner who <b
                            class="text-color-primary">{{ selectedQuery() }}.</b>
                    </div>
                    <div class="flex flex-col justify-center">
                        <Button class="btn-primary mb-2" :onClick="onNextPage">
                            Next: See more drafts
                        </Button>
                    </div>
                    <DisablePanel v-if="isGenerating" />
                </div>
            </div>
            <div v-if="!isGenerating" class="primary-panel primary-panel-md primary-panel-sd primary-panel-sm">
                <Paper :content="draft" draftNum="3" :mode="mode" :subject="subject" :selected="selected" />
            </div>
            <LoadingPanel v-if="isGenerating" :indeterminate="isGenerating && !isModalVisible" />
        </div>
        <div class=" md:hidden sm:block w-full absolue bottom-0 z-50">
            <div class="sm-tool-bar ">
                <div class="text-main-content mb-4">The messaging has been updated for a learner who <b
                        class="text-color-primary">{{ selectedQuery() }}.</b>
                </div>
                <div class="grid w-full grid-cols-1">
                    <div class="flex flex-col justify-center">
                        <Button class="btn-primary mb-2" :onClick="onNextPage">
                            Next: See more drafts
                        </Button>
                    </div>
                </div>
                <DisablePanel v-if="isGenerating" />
            </div>
        </div>
        <DraftModal :showModal="isModalVisible" @close="closeModal" :isGenerated="isGenerated" />
    </div>
</template>
<script>
import MenuBar from '../../components/MenuBar.vue';
import Button from '../../components/Button.vue';
import Paper from '../../components/Paper.vue';
import ShareButton from '../../components/ShareButton.vue';
import DisablePanel from '../../components/utils/DisablePanel.vue';
import LoadingPanel from '../../components/utils/LoadingPanel.vue';
import generateAnswer from '../../actions/generate';
import DraftModal from '../../components/utils/DraftModal.vue';
import { PROMPT_FOUR } from '../../prompts';
export default {
    components: {
        MenuBar,
        Button,
        Paper,
        ShareButton,
        Paper,
        DisablePanel,
        LoadingPanel,
        DraftModal
    },
    name: 'Four Question',
    data() {
        return {
            isGenerating: false,
            isGenerated: false,
            isModalVisible: false,
        }
    },
    methods: {
        openModal() {
            this.isModalVisible = true;
        },
        closeModal() {
            this.isModalVisible = false;
        },
        checkNext() {
            if (this.isModalVisible === false && this.isGenerated === true) {
                this.$router.push({
                    path: '/generate_three_version',
                    query: {
                        question1: this.$route.query.question1,
                        question2: this.$route.query.question2,
                        question3: this.$route.query.question3,
                        question4: this.$route.params.selected,
                    }
                })
            }
        },

        onNextPage() {
            this.isGenerating = true;
            this.openModal();
            generateAnswer(PROMPT_FOUR(this.$store.state.draft3, this.$store.state.prompt3)).then(res => {
                let part = res.split('$');
                this.$store.dispatch('setDraft4', part[0]);
                let index1 = part[1].indexOf('S');
                let index2 = part[2].indexOf('S');
                this.$store.dispatch('setDraft5', part[1].slice(index1));
                this.$store.dispatch('setDraft6', part[2].slice(index2));
                this.isGenerating = false;
                this.isGenerated = true;
                this.checkNext();
            }).catch(err => {
                this.isGenerating = false;
                console.log(err)
            });

        },
        updateLeD() {
            this.$router.go(-1);
        },
        selectedQuery() {
            let question4 = "";
            for (let i = 0; i < this.selected.length; i++) {
                if (this.selected.length < 2) {
                    question4 += this.selected[i];
                } else {
                    if (i < this.selected.length - 2) {
                        question4 += this.selected[i] + ", "
                    } else if (i == this.selected.length - 2) {
                        question4 += this.selected[i] + " and "
                    } else {
                        question4 += this.selected[i];
                    }
                }
            }
            return question4;
        }
    },
    computed: {
        draft() {
            return this.$store.state.draft3;
        },
        subject() {
            return this.$route.query.question1;
        },
        mode() {
            return this.$route.query.question3;
        },
        selected() {
            return this.$route.params.selected.split(",");
        }
    },
    watch: {
        isModalVisible(newValue, oldValue) {
            this.checkNext();
        }
    },
}
</script>
