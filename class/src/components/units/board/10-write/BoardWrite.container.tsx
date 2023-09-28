import BoardWriteUI from "./BoardWrite.presenter"
import { useMutation } from "@apollo/client"
import { useState, ChangeEvent } from "react"
import { CREATE_BOARD, UPDATE_BOARD } from "./BoardWrite.queries"
import { useRouter } from "next/router"
import { IBoardWriteProps, ImyVariables } from "./BoardWrite.types"



export default function BoardWrite(props: IBoardWriteProps) {
    const router = useRouter()
    
    const [myColor, setMyColor] = useState(false)
    
    const [writer, setWriter] = useState("")
    const [title, setTitle] = useState("")
    const [contents, setContents] = useState("")
    const [createBoard] = useMutation(CREATE_BOARD)
    const [updateBoard] = useMutation(UPDATE_BOARD)
    

    const onClickSubmit = async () => {
        const result = await createBoard({
            variables: {
                writer: writer,
                title: title,
                contents:contents
            }
        })
        console.log(result)
        alert(result.data.createBoard.message)
        router.push(`/10-01-typescript-boards/${result.data.createBoard.number}`)
    }

    const onClickUpdate = async () => {
        
        const myVariables: ImyVariables = {
            number: Number(router.query.number)
        }
        if(writer) myVariables.writer = writer
        if(title) myVariables.title = title
        if(contents) myVariables.contents = contents

        // 1. 수정하기 뮤테이션 날리기
        const result = await updateBoard({
            variables : myVariables
        })
        // 2. 상세페이지로 이동하기
        //router.push()
        console.log(result)
        alert(result.data.updateBoard.message)
        router.push(`/10-01-typescript-boards/${result.data.updateBoard.number}`)
    }

    const onChangeWriter = (event: ChangeEvent<HTMLInputElement>) => {
        setWriter(event.target.value)
        if(event.target.value&&title&&contents){
            setMyColor(true)
        }
    }

    const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value)
        if(writer&&event.target.value&&contents){
            setMyColor(true)
        }
    }

    const onChangeContents = (event: ChangeEvent<HTMLInputElement>) => {
        setContents(event.target.value)
        if(writer&&title&&event.target.value){
            setMyColor(true)
        }
    }

    return (
        <BoardWriteUI
            onClickSubmit={onClickSubmit}
            onClickUpdate={onClickUpdate}
            onChangeWriter={onChangeWriter}
            onChangeTitle={onChangeTitle}
            onChangeContents={onChangeContents}
            isEdit={props.isEdit}
            data={props.data}
         />
    )
}