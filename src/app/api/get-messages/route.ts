import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/options';
import  { connectToDB } from '@/lib/dbConnect';
import { User } from 'next-auth';
import UserModel from '@/Model/User';
import mongoose from 'mongoose';
import { TruckElectric } from 'lucide-react';

export async function GET(request : Request) {
    await connectToDB()
    const session = await getServerSession(authOptions)
    const user: User = session?.user;

    if(!session || !session.user){
        return Response.json({
                success : false , 
                message : "Not Authenticated"
            }, 
            { status : 401}
        )
    }

    const userId = new mongoose.Types.ObjectId(user._id) ;
    try {
        const user = await UserModel.aggregate([
            {$match : {_id : userId}} , 
            {$unwind : '$messages'} , 
            {$sort : {'messages.createdAt'  :-1 }} ,
            {$group : {_id : '$_id', messages : {$push : '$messages'}}}
        ])

        if(!user || user.length === 0){
            return Response.json(
                {
                    success : false , 
                    message : "User not found"
                }, 
                { status : 401 }
             )
        }

        return Response.json(
            {
                success : true , 
                messages : user[0].messages
            }, 
            { status : 200 }
         )
    } catch (error) {
        console.error(error);
        return Response.json(
            { success: false, message: "Something went wrong!" },
            { status: 500 }
        );
    } 

}

