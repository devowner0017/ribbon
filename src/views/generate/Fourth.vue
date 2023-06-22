<template>
    <div class="flex flex-col grow">
        <MenuBar />
        <div class="w-full flex grow grid md:grid-cols-2 sm:gird-cols-1 ">
            <div class="relative md:flex flex-col grow w-full justify-center items-center hidden">
                <div class="form-content form-content-md form-content-sd form-content-sm">
                    <div class="text-main-content mb-4 w-full">Want to personalize this further? Select any that apply to
                        this Learner:
                    </div>
                    <div class=" grid grid-cols-2">
                        <CheckCard text="holds a job" :isSelected="selected.includes('Holds a job')"
                            :disabled="otherCardDisabled" @click="select('Holds a job')" />
                        <CheckCard text="caretaker" :isSelected="selected.includes('Caretaker')"
                            :disabled="otherCardDisabled" @click="select('Caretaker')" />
                        <CheckCard text="recent illness" :isSelected="selected.includes('Recent illness')"
                            :disabled="otherCardDisabled" @click="select('Recent illness')" />
                        <CheckCard text="recent travel" :isSelected="selected.includes('Recent travel')"
                            :disabled="otherCardDisabled" @click="select('Recent travel')" />
                        <CheckCard text="Took time off" :isSelected="selected.includes('Took time off')"
                            :disabled="otherCardDisabled" @click="select('Took time off')" />
                        <CheckCard text="none apply" :isSelected="selected.includes('none apply')"
                            :disabled="noApplyDisabled" @click="select('none apply')" />
                    </div>
                    <div class="flex flex-row w-full">
                        <Button class="btn-primary  mt-1 w-full" :onClick="makeDraft3"
                            :disabled="!selected.length > 0">continue</Button>
                    </div>
                    <DisablePanel v-if="isGenerating" />
                </div>
            </div>
            <div v-if="!isGenerating" class="primary-panel primary-panel-md primary-panel-sd primary-panel-sm">
                <Paper :content="draft" draftNum="2" :mode="mode" :subject="subject" />
            </div>
            <LoadingPanel v-if="isGenerating" :indeterminate="isGenerating && !isModalVisible" />
        </div>
        <div class=" md:hidden sm:block w-full absolue bottom-0 z-50">
            <div class="sm-tool-bar ">
                <div class="text-main-content mb-4">Want to personalize this further? Select any that apply to this Learner:
                </div>
                <div class="grid w-full grid-cols-1">
                    <div class="grid w-fill grid-cols-3">
                        <CheckCard text="holds a job" :isSelected="selected.includes('Holds a job')"
                            :disabled="otherCardDisabled" @click="select('Holds a job')" />
                        <CheckCard text="caretaker" :isSelected="selected.includes('Caretaker')"
                            :disabled="otherCardDisabled" @click="select('Caretaker')" />
                        <CheckCard text="recent illness" :isSelected="selected.includes('Recent illness')"
                            :disabled="otherCardDisabled" @click="select('Recent illness')" />
                    </div>
                    <div class="grid w-full grid-cols-3">
                        <CheckCard text="recent travel" :isSelected="selected.includes('Recent travel')"
                            :disabled="otherCardDisabled" @click="select('Recent travel')" />
                        <CheckCard text="Took time off" :isSelected="selected.includes('Took time off')"
                            :disabled="otherCardDisabled" @click="select('Took time off')" />
                        <CheckCard text="none apply" :isSelected="selected.includes('none apply')"
                            :disabled="noApplyDisabled" @click="select('none apply')" />
                    </div>
                </div>
                <div class="flex flex-row w-full">
                    <Button class="btn-primary  mt-1 w-full" :onClick="makeDraft3"
                        :disabled="!selected.length > 0">continue</Button>
                </div>
                <DisablePanel v-if="isGenerating" />
            </div>
        </div>
        <DraftModal :showModal="isModalVisible" id="2" @close="closeModal" :isGenerated="isGenerated" />
    </div>
</template>
<script>
import MenuBar from '../../components/MenuBar.vue';
import CheckCard from '../../components/CheckCard.vue';
import Button from '../../components/Button.vue';
import Paper from '../../components/Paper.vue';
import ShareButton from '../../components/ShareButton.vue';
import DisablePanel from '../../components/utils/DisablePanel.vue';
import LoadingPanel from '../../components/utils/LoadingPanel.vue';
import DraftModal from '../../components/utils/DraftModal.vue';
import generateAnswer from '../../actions/generate';
import { HOLD_A_JOB, CARETAKER, RECENT_ILLNESS, RECENT_TRAVEL, TOOK_TIME_OFF, PROMPT_THREE, PROMPT_FOUR } from '../../prompts';
export default {
    components: {
        MenuBar,
        Button,
        Paper,
        ShareButton,
        CheckCard,
        DisablePanel,
        LoadingPanel,
        DraftModal
    },
    name: 'four-question',
    data() {
        return {
            selected: [],
            isGenerating: false,
            isGenerated: false,
            isModalVisible: false,
            hold_a_job: HOLD_A_JOB,
            caretaker: CARETAKER,
            recent_illness: RECENT_ILLNESS,
            recent_travel: RECENT_TRAVEL,
            took_time_off: TOOK_TIME_OFF,
            select_url: null,
        }
    },
    methods: {
        select(value) {
            if (!this.selected.includes(value)) {
                this.selected = [...this.selected, value];
            } else {
                const index = this.selected.indexOf(value)
                if (index !== -1) {
                    this.selected.splice(index, 1);
                }
            }
        },
        ////////////////////
        convertSelected(select) {
            if(select.trim()==='Recent travel') {
                return RECENT_TRAVEL;
            } else if(select.trim()==='Caretaker') {
                return CARETAKER;
            } else if(select.trim()==='Holds a job') {
                return HOLD_A_JOB;
            } else if(select.trim()==='Recent illness') {
                return RECENT_ILLNESS;
            } else if(select.trim()==='Took time off') {
                return TOOK_TIME_OFF;
            } 
        },
        selectedQuery() {
            let question4 = "";
            for (let i = 0; i < this.selected.length; i++) {
                if (this.selected.length < 2) {
                    question4 +=  this.convertSelected(this.selected[i]);
                } else {
                    if (i < this.selected.length - 2) {
                        question4 += this.convertSelected(this.selected[i]) + ", "
                    } else if (i == this.selected.length - 2) {
                        question4 += this.convertSelected(this.selected[i]) + " and "
                    } else {
                        question4 += this.convertSelected(this.selected[i]);
                    }
                }
            }
            return question4;
        },
        /////////////
        openModal() {
            this.isModalVisible = true;
        },
        closeModal() {
            this.isModalVisible = false;
        },
        checkNext1() {
            if (this.isModalVisible === false && this.isGenerated === true) {
                this.$router.push({
                    path: `/questions/4/draft3/${this.select_url}`,
                    query: {
                        question1: this.$route.query.question1,
                        question2: this.$route.query.question2,
                        question3: this.$route.query.question3,
                    }
                });
            }
        },
        checkNext2() {
            if (this.isModalVisible === false && this.isGenerated === true) {
                this.$router.push({
                    path: `/generate_three_version`,
                    query: {
                        question1: this.$route.query.question1,
                        question2: this.$route.query.question2,
                        question3: this.$route.query.question3,
                    }
                });
            }
        },
        makeDraft3() {
            this.isGenerating = true;
            if (this.noApplyDisabled) {
                this.openModal();
                const prompt = PROMPT_THREE(this.$store.state.draft2, this.$store.state.prompt2, this.selectedQuery());
                let _selected = "";
                for (let i = 0; i < this.selected.length; i++) {
                    if (this.selected.length < 2) {
                        _selected += this.selected[i];
                    } else {
                        if (i < this.selected.length - 1) {
                            _selected += this.selected[i] + ", "
                        } else {
                            _selected += this.selected[i];
                        }
                    }
                }
                this.select_url = _selected;
                this.answer = generateAnswer(`${prompt}`, "3").then(res => {
                    this.isGenerating = false;
                    this.isGenerated = true;
                    this.$store.dispatch('setDraft3', res);
                    this.$store.dispatch('setPrompt3', prompt);
                    this.checkNext1();
                }).catch(err => {
                    this.isGenerating = false;
                    console.log(err)
                });
            } else {
                this.$store.dispatch('setDraft3', this.$store.state.draft2);
                this.$store.dispatch('setPrompt3', this.$store.state.prompt2);
                // this.isGenerating = true;
                this.$router.push({
                    path: `/questions/4/draft3/noApply`,
                    query: {
                        question1: this.$route.query.question1,
                        question2: this.$route.query.question2,
                        question3: this.$route.query.question3,
                    }
                });
                this.checkNext1();
                // this.openModal();
                // generateAnswer(PROMPT_FOUR(this.$store.state.draft2, this.$store.state.prompt2), '4-6').then(res => {
                //     let part = res.split('$');
                //     this.$store.dispatch('setDraft4', part[0]);
                //     let index1 = part[1].indexOf('S');
                //     let index2 = part[2].indexOf('S');
                //     this.$store.dispatch('setDraft5', part[1].slice(index1));
                //     this.$store.dispatch('setDraft6', part[2].slice(index2));
                //     this.isGenerating = false;
                //     this.isGenerated = true;
                //     this.checkNext2()
                // }).catch(err => {
                //     this.isGenerating = false;
                //     console.log(err)
                // });
            }
        }

    },
    watch: {
        isModalVisible(newValue, oldValue) {
            if (this.noApplyDisabled) {
                this.checkNext1();
            } else {
                this.checkNext2();
            }
        }
    },
    computed: {
        draft() {
            return this.$store.state.draft2;
        },
        noApplyDisabled() {
            return !this.selected.includes('none apply') && this.selected.length > 0;
        },
        otherCardDisabled() {
            return this.selected.includes('none apply');
        },
        subject() {
            return this.$route.query.question1;
        },
        mode() {
            return this.$route.query.question3;
        },
    },
}
</script>
