<template>
    <div class="flex flex-col grow">
        <MenuBar />
        <div class="w-full flex grow grid md:grid-cols-2 sm:gird-cols-1 ">
            <div class="relative md:flex flex-col grow w-full justify-center items-center hidden">
                <div class="form-content form-content-md form-content-sd form-content-sm">
                    <div class="text-main-content mb-4 px-2">Select a final version from these <span class="text-primary-content">3 options</span>
                    </div>
                    <div class=" grid grid-cols-3">
                        <ToggleCard text="OPTION A" option @click="onSelectDraft('4')" />
                        <ToggleCard text="OPTION B" option @click="onSelectDraft('5')" />
                        <ToggleCard text="OPTION C" option @click="onSelectDraft('6')" />
                    </div>
                    <div class="flex flex-row w-full px-1">
                        <Button class="btn-primary  mt-1 w-full" :onClick="onNextPage">select</Button>
                    </div>
                </div>
            </div>
            <div v-if="!isGenerating" class="primary-panel primary-panel-md primary-panel-sd primary-panel-sm">
                <Paper :content="selected_draft" :draftNum="selected_id" :selected="selected" :mode="mode" />
            </div>
        </div>
        <div class=" md:hidden sm:block w-full absolue bottom-0 z-50">
            <div class="sm-tool-bar ">
                <div class="text-main-content mb-4 px-2">Here are <span class="text-primary-content">3 additional
                        options.</span>
                </div>
                <div class="grid w-full grid-cols-3">
                    <ToggleCard text="OPTION A" option @click="onSelectDraft('4')" />
                    <ToggleCard text="OPTION B" option @click="onSelectDraft('5')" />
                    <ToggleCard text="OPTION C" option @click="onSelectDraft('6')" />
                </div>
                <div class="flex flex-row w-full px-1">
                    <Button class="btn-primary  mt-1 w-full" :onClick="onNextPage">select</Button>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
import MenuBar from '../../components/MenuBar.vue';
import ToggleCard from '../../components/ToggleCard.vue';
import Button from '../../components/Button.vue';
import Paper from '../../components/Paper.vue';
import ShareButton from '../../components/ShareButton.vue';
export default {
    components: {
        ToggleCard,
        MenuBar,
        Button,
        Paper,
        ShareButton,
    },
    name: 'generate',
    data() {
        return {
            isModalVisible: false,
            isGenerating: false,
            selected_draft: "",
            selected_id: '4',
        }
    },
    methods: {
        onNextPage() {
            this.$router.push({
                path: `/done/${this.selected_id}`,
                query: {
                    question3: this.$route.query.question3,
                    question4: this.$route.query.question4,
                }
            })
        },
        onClickShare() {
            this.isModalVisible = true;
        },
        onSelectDraft(id) {
            if (id === '4') {
                this.selected_draft = this.$store.state.draft4;
                this.selected_id = '4'
            } else if (id === '5') {
                this.selected_draft = this.$store.state.draft5;
                this.selected_id = '5'
            } else if (id === '6') {
                this.selected_draft = this.$store.state.draft6;
                this.selected_id = '6'
            }
        }
    },
    mounted() {
        this.selected_draft = this.$store.state.draft4;
    },
    computed: {
        selected() {
            if (this.$route.query.question4)
                return this.$route.query.question4.split(",");
        },
        mode() {
            return this.$route.query.question3;
        },
    }
}
</script>
