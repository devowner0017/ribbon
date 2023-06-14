<template>
    <div class="flex flex-col grow">
        <MenuBar />
        <div class="w-full flex grow grid md:grid-cols-2 sm:gird-cols-1 ">
            <div :class="['relative md:flex flex-col grow justify-center items-center sm:hidden hidden',]">
                <div class="form-content form-content-md form-content-sd form-content-sm">
                    <div class="text-main-content mb-4 w-full">How is this? Would you like it more:
                    </div>
                    <div class="flex flex-col justify-center">
                        <ToggleCard text="professional" icon="/images/professional.svg"
                            @click="makeDraft2('Professional')" />
                        <ToggleCard text="supportive" icon="/images/supportive.svg" @click="makeDraft2('Supportive')" />
                        <ToggleCard text="upbeat" icon="/images/upbeat.svg" @click="makeDraft2('Upbeat')" />
                        <ToggleCard text="looks good" icon="/images/looksgood.svg" @click="makeDraft2('looks_good')" />
                    </div>
                </div>
                <DisablePanel v-if="isGenerating" />
            </div>
            <div v-if="!isGenerating" class="primary-panel primary-panel-md primary-panel-sd primary-panel-sm">
                <Paper :content="draft" draftNum="1" :subject="subject" />
            </div>
            <LoadingPanel v-if="isGenerating" :indeterminate="isGenerating&&!isModalVisible"/>
        </div>
        <div class="md:hidden sm:block w-full absolue bottom-0 z-50">
            <div class="sm-tool-bar ">
                <div class="text-main-content mb-4">How is this? Would you like it more:
                </div>
                <div class="grid w-full grid-cols-2">
                    <div class="m-1">
                        <ToggleCard text="professional" icon="/images/professional.svg"
                            @click="makeDraft2('Professional')" />
                    </div>
                    <div class="m-1">
                        <ToggleCard text="supportive" icon="/images/supportive.svg" @click="makeDraft2('Supportive')" />
                    </div>
                    <div class="m-1">
                        <ToggleCard text="upbeat" icon="/images/upbeat.svg" @click="makeDraft2('Upbeat')" />
                    </div>
                    <div class="m-1">
                        <ToggleCard text="looks good" icon="/images/looksgood.svg" @click="makeDraft2('looks_good')" />
                    </div>
                </div>
            </div>
            <DisablePanel v-if="isGenerating" />
        </div>
        <DraftModal :showModal="isModalVisible" @close="closeModal" id="1" :isGenerated="isGenerated" />
    </div>
</template>
<script>
import MenuBar from '../../components/MenuBar.vue';
import ToggleCard from '../../components/ToggleCard.vue';
import Button from '../../components/Button.vue';
import Paper from '../../components/Paper.vue';
import ShareButton from '../../components/ShareButton.vue';
import generateAnswer from '../../actions/generate';
import DisablePanel from '../../components/utils/DisablePanel.vue';
import LoadingPanel from '../../components/utils/LoadingPanel.vue';
import { PROFESSIONAL, SUPPORTIVE, UPBEAT } from '../../prompts';
import { PROMPT_TWO } from '../../prompts';
import DraftModal from '../../components/utils/DraftModal.vue';
export default {
    components: {
        ToggleCard,
        MenuBar,
        Button,
        Paper,
        ShareButton,
        DisablePanel,
        LoadingPanel,
        DraftModal
    },
    name: 'three-question',
    data() {
        return {
            professional: PROFESSIONAL,
            supportive: SUPPORTIVE,
            upbeat: UPBEAT,
            isGenerating: false,
            isGenerated: false,
            isModalVisible: false,
            tone: null,
        }
    },
    methods: {
        openModal() {
            this.isModalVisible = true;
        },
        closeModal() {
            this.isModalVisible = false;
        },
        makeDraft2(tone) {
            this.isGenerating = true;     
            if (tone != "looks_good") {
                this.openModal();
                this.tone = tone;
                const prompt = PROMPT_TWO(this.$store.state.draft1, this.$store.state.prompt1, tone);
                this.answer = generateAnswer(prompt, "2").then(res => {
                    this.isGenerating = false;
                    this.$store.dispatch('setDraft2', res);
                    this.$store.dispatch('setPrompt2', prompt);
                    this.isGenerated = true;
                    this.checkNext();
                }).catch(err => {
                    this.isGenerating = false;
                    console.log(err)
                });
            } else {
                this.$store.dispatch('setDraft2', this.$store.state.draft1);
                this.$store.dispatch('setPrompt2', this.$store.state.prompt1);
                this.$router.push({
                    path: `/questions/3/draft2/${tone}`,
                    query: {
                        question1: this.$route.query.question1,
                        question2: this.$route.query.question2,
                    }
                });
            }
        },
        checkNext() {
            if (this.isModalVisible === false && this.isGenerated === true) {
                this.$router.push({
                    path: `/questions/3/draft2/${this.tone}`,
                    query: {
                        question1: this.$route.query.question1,
                        question2: this.$route.query.question2,
                    }
                });
            }
        },
       
    },
    watch: {
        isModalVisible(newValue, oldValue) {
            this.checkNext();
        }
    },
    computed: {
        draft() {
            return this.$store.state.draft1;
        },
        subject() {
            return this.$route.query.question1;
        }
    },
}
</script>
