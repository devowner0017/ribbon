<template>
    <div class="w-full h-full relative">

        <div class="absolute paper-text paper-text-sd paper-text-sm">
            <div class="mb-3">
                <b>
                    {{ draftName }}
                </b><br />
                <div v-if="(mode.length > 0 && mode !== 'looks_good') || selected.length > 0" class="border-b">
                    <div class="more-item mr-2 inline-block mb-2">
                        more {{ mode }}
                    </div>
                    <div v-for="(item, index) in selected" class="more-item mr-2 inline-block mb-2">
                        {{ item }}
                    </div>
                </div>
            </div>
            {{
                this.content
            }}
        </div>
        <ShareButton class="absolute md:block bottom-6 right-6 share-btn-sm sm:hidden hidden">
            <div class="flex">
                <img src="/images/messageBox.svg" class="mr-2" alt="share" /> SHARE
            </div>
        </ShareButton>
        <div class=" paper">
            <div class="paper-piece-1"></div>
            <div class="paper-piece-2"></div>
            <div class="paper-piece-3"></div>
        </div>
    </div>
</template>
<script>
import ShareButton from './ShareButton.vue';
export default {
    props: {
        content: {
            type: String,
            default: ''
        },
        draftNum: {
            type: String,
            default: 1
        },
        mode: {
            type: String,
            default: ""
        },
        subject: {
            type: String,
            default: ''
        },
        selected: {
            type: Array,
            default: []
        }
    },
    components: {
        ShareButton,
    },
    name: 'paper',
    computed: {
        draftName() {
            if(this.draftNum==='4') return "OPTION A";
            if(this.draftNum==='5') return "OPTION B";
            if(this.draftNum==='6') return "OPTION C"
            return `Draft #${this.draftNum}`
        }
    }

}
</script>