<script setup>
/*-----------------------------------Imports---------------------------- */

// import getCurrentLocation from "~/helpers/get-current-geo-location";

const props = defineProps({
    eventLocation: {
        type: Object,
        required: true,
    }

});

// default: () =>,

// static location
/*-----------------------------------Map data---------------------------- */

const center = ref([9.010631945576197, 38.76055205651439])
if (props.eventLocation?.location?.coordinates?.length > 0) {
    center.value = props.eventLocation.location?.coordinates
}
const zoom = ref(12)





</script>

<template>
    <div class="w-full h-[26rem] z-0">
        <LMap :use-global-leaflet="true" :zoom="zoom" :min-zoom="5" :max-zoom="24" :center="center"
            :options="{ zoomControl: true }" class="z-0">
            <!-- --------------------Layers---------------------- -->
            <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&amp;copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                layer-type="base" name="OpenStreetMap" />

            <!-- --------------------Markers---------------------- -->
            <LMarker :lat-lng="eventLocation.location?.coordinates" :name="eventLocation.area?.name">
                <!-- -------------------------Icon Image---------------- -->

                <LIcon :name="eventLocation.area?.name" :class="'custom-div-icon'" :icon-size="[40, 40]"
                    icon-url="/mapIcon.jpg"></LIcon>

                <!-- -------------------------Tooltip---------------- -->
                <LTooltip :permanent="true" :direction="'top'" :offset="[0, -50]">
                    <div class="text-primary-600">{{ eventLocation.area?.name }}</div>
                </LTooltip>
                <!-- -------------------------Popup---------------- -->
                <LPopup :offset="[0, -50]">
                    <div class="flex flex-col w-full">
                        <p class="text-primary-600">{{ eventLocation.area?.name }}</p>

                    </div>
                </LPopup>
            </LMarker>
        </LMap>
    </div>
</template>
<!-- Lmarker is the marker/icon that shows the actual position/location -->
<!-- we can put an icon in the Lmarker -->
<!-- tooltip - something that comes up when hovered on the Lmarker -->
<!-- Pop - something that comes up when the Lmarker is touched -->



<style>
.custom-div-icon {
    background-color: blue;
}

.leaflet-popup-content-wrapper {
    width: 150px !important;
}

.leaflet-popup-content {
    width: 80% !important;
}
</style>