<template>
    <div class="toggle-card flex">
        <button :class="['card card-sm', {'justify-center items-center text-center': option}]"  :onClick="this.onClick" :onFocus="onFocus" :onFocusout="onFocusOut" >
            <span :hidden="!icon">
                <object :data="icon" class="imgColor md:inline hidden" type="image/svg+xml" width="45" ref="icon" height="45" ></object>
                <object :data="icon" class="imgColor md:hidden inline" type="image/svg+xml" width="24" ref="icon_s" height="24" ></object>
            </span>
            <span>{{ text }}</span>
        </button>
    </div>
</template>
<script>
export default {
    name: 'ToggleCard',
    props: {
        icon: {
            type: String,
            default: null,
        },
        text: {
            type: String,
            default: "",
        },
        onClick: {
            type: Function,
            default: null
        },
        option: {
            type: Boolean,
            default: false,
        }
    },
    data() {
        return {
            isSelected: false,
        }
    },
    methods: {
    //   onFocus(event) {
        
    //      const svgDoc_m = this.$refs.icon;
    //      const shapes_m = svgDoc_m.contentDocument.querySelectorAll(':scope rect, :scope circle, :scope path');
    //      shapes_m.forEach(shape => {
    //         shape.style.fill = "white";
    //      });
        
       
    //   },
    //   onFocusOut(event) {
    //      const svgDoc_m = this.$refs.icon;
    //      const shapes_m = svgDoc_m.contentDocument.querySelectorAll(':scope rect, :scope circle, :scope path');
    //      shapes_m.forEach(shape => {
    //         shape.style.fill = "#6558f5";
    //      });
        
    //   }
   }
}
</script>