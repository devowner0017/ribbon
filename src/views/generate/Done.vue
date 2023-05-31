<template>
    <div class="flex flex-col grow">
        <MenuBar />
        <div class="w-full flex grow grid md:grid-cols-2 sm:gird-cols-1 ">
            <div class=" md:flex flex-col grow w-full justify-center items-center hidden">
                <div class="form-content form-content-md form-content-sd form-content-sm">
                    <div class="flex flex-col justify-center">
                        <p class="header-text">
                            Thanks for using Ribbon’s AI-Powered Smart Compose Tool
                        </p>
                        <p class="mid-text mt-3 mb-5">
                            Provide your email so we can send you your final version and get access to our top performing
                            email templates used by institutions like yours.
                        </p>
                        <InputGroup title="Name" placeHolder="First and last name" />
                        <InputGroup title="Email" placeHolder="Enter your email address" />
                        <Button class="btn-primary mb-2" :onClick="onNextPage">
                            SEND ME FINAL VERSION
                        </Button>
                        <div class="line my-8"></div>
                        <p class="bottom-text-title">
                            About Ribbon Education
                        </p>
                        <p class="bottom-text">
                            Ribbon builds tools that help advisors and student facing staff quickly understand learner
                            context and automate busy work so that your time and energy can go back to human interactions
                            with your actual students.
                        </p>
                        
                    </div>
                </div>
            </div>
            <div class="primary-panel primary-panel-md primary-panel-sd primary-panel-sm">
                <Paper :content="selected_draft" draftNum="final" :subject="subject" :mode="mode" :selected="selected" />
            </div>
        </div>
        <div class=" md:hidden sm:block w-full fixed bottom-0 ">
            <div class="flex justify-end">
                <ShareButton class="share-btn-sm mb-6 mr-6"></ShareButton>
            </div>
            <div class="sm-tool-bar ">
                <div class="text-main-content mb-4">The draft is now more {{ mode }}:
                </div>
                <div class="grid w-full grid-cols-1">
                    <div class="flex flex-col justify-center">
                        <Button class="btn-primary mb-2" :onClick="onNextPage">
                            Next: personalize m
                        </Button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
import MenuBar from '../../components/MenuBar.vue';
import Button from '../../components/Button.vue';
import Paper from '../../components/Paper.vue';
import ShareButton from '../../components/ShareButton.vue';
import InputGroup from '../../components/InputGroup.vue';
export default {
    components: {
        MenuBar,
        Button,
        Paper,
        ShareButton,
        InputGroup
    },
    name: 'Second Question',
    methods: {
        onNextPage() {
            this.$router.push({
                path: '/questions/4',
                query: {
                    question1: this.$route.query.question1,
                    question2: this.$route.query.question2,
                    question3: this.$route.params.question
                }
            });
        },
    },
    computed: {
        draft() {
            return this.$store.state.draft2;
        },
        selected() {
            return this.$route.query.question4.split(",");
        },
        mode() {
            return this.$route.query.question3;
        },
        subject() {
            return this.$route.query.question1;
        },
        selected_draft() {
            const selected_id = this.$route.params.selected;
            if(selected_id==='4') {
                return this.$store.state.draft4;
            } else if(selected_id==='5') {
                return this.$store.state.draft5;
            } else if(selected_id==='6') {
                return this.$store.state.draft6;
            }
        }
    },
}
</script>

<style scoped>
.header-text {
    font-family: 'Outfit';
    font-style: normal;
    font-weight: 700;
    font-size: 32px;
    line-height: 40px;
}

.mid-text {
    font-family: 'Outfit';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 28px;
}

.bottom-text-title {
    font-family: 'Outfit';
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 28px;
}

.bottom-text {
    font-family: 'Outfit';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
}

.line {
    border: 1px solid #D2CACA;
}
</style>
