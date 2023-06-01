<template>
    <div class="flex flex-col grow">
        <MenuBar />
        <div class="w-full flex grow grid md:grid-cols-2 sm:gird-cols-1 ">
            <div class=" md:flex flex-col grow w-full justify-center items-center hidden">
                <div class="form-content form-content-md form-content-sd form-content-sm">
                    <div v-if="mode!=='looks_good'" class="text-main-content mb-4 w-full">The draft is now more <b class="text-color-primary">{{ mode }}.</b>
                    </div>
                    <div class="flex flex-col justify-center">
                        <Button class="btn-primary mb-2"  :onClick="onNextPage">
                            Next: personalize some more
                        </Button>
                    </div>
                </div>
            </div>
            <div class="primary-panel primary-panel-md primary-panel-sd primary-panel-sm">
                <Paper :content="draft" draftNum="2" :subject="subject" :mode="mode"/>
            </div>
        </div>
        <div class=" md:hidden sm:block w-full fixed bottom-0 ">
          
            <div class="sm-tool-bar ">
                <div v-if="mode!=='looks_good'"  class="text-main-content mb-4">The draft is now more <b class="text-color-primary">{{ mode }}.</b>
                </div>
                <div class="grid w-full grid-cols-1">
                    <div class="flex flex-col justify-center">
                        <Button class="btn-primary mb-2" :onClick="onNextPage">
                            Next: personalize Some More
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
export default {
    components: {
        MenuBar,
        Button,
        Paper,
        ShareButton
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
        chooseDifferentTone() {
            this.$router.go(-1);
        }
    },
    computed: {
        draft() {
            return this.$store.state.draft2;
        },
        mode() {
            return this.$route.params.question;
        },
        subject() {
            return this.$route.query.question1;
        }
    },
}
</script>
