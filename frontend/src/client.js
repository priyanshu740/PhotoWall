import sanityClient from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = sanityClient ({
    projectId:'1iq7u8co', 
    apiVersion:'2021-12-31',
    dataset:'production',
    useCdn:true,
    token:'skmeSCeOIclqqjhdBuEREFlHATb83Hzier9HtuHPxRGaPiyfgKgc7pwWysJQwabWrlZXPlvJQSFGCgleKvvitcGARt5pry8lqWeTUBjWKZUg5v856sufB1vhkqDYuTHO20cUskX2CkZV1ZFeRV6j3oe4JbsP2kFUASQThze2uNYA7tNL6uKc'
}) 

const builder = imageUrlBuilder(client)

export const urlFor = (source) => builder.image(source)