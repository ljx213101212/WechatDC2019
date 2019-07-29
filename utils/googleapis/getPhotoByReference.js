
/** 
 * 
 * 
 * 
 * 
 */
function get_photo_by_reference(maxwidth,photoReference) {
  return 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=' + maxwidth + '&photoreference=' + photoReference +'&key=AIzaSyD0LvrXWXz5pwznGHNaqtFCq3K9eNmtkYk';
}

export default function getPhotoURLByReference(photoReference, maxwidth = 600) {
  return get_photo_by_reference(maxwidth,photoReference);
}

// Example:
//
// import getPhotoByReference from '../../utils/googleapis/getPhotoByReference.js';
// var url = getPhotoByReference('400','CnRtAAAATLZNl354RwP_9UKbQ_5Psy40texXePv4oAlgP4qNEkdIrkyse7rPXYGd9D_Uj1rVsQdWT4oRz4QrYAJNpFX7rzqqMlZw2h2E2y5IKMUZ7ouD_SlcHxYq1yL4KbKUv3qtWgTK0A6QbGh87GB3sscrHRIQiG2RrmU_jF4tENr9wGS_YxoUSSDrYjWmrNfeEHSGSc3FyhNLlBU')