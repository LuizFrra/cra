import React, { Component } from 'react'
import { Upload } from 'antd';
import { CloudUploadOutlined } from '@ant-design/icons'
import 'antd/lib/notification/style/index.css';
import './UploadContent.scss'

const { Dragger } = Upload;

export default class UploadContent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            uploadContent: "",
            fileUploaded: false
        };
    }

    beforeUpload = (file) => {
        const isPdf = file.type === "application/pdf";
        if (!isPdf) {
            return false;
        }else {
            console.log(file);
            let reader = new FileReader();
            reader.onload = (e) => {
                this.props.onUploadPdf(e.target.result.replace("data:application/pdf;base64,", ""));
            }
            reader.readAsDataURL(file);
        }
    }

    renderUploadContent = () => {
        if (!this.state.fileUploaded) {
            return (
                <Dragger style={{ height: "100%" }} showUploadList={false} beforeUpload={this.beforeUpload} customRequest={()=>{}}>
                    <div className={"uploadContent"}>
                        <CloudUploadOutlined className={"uploadIcon"}></CloudUploadOutlined>
                        <br></br>
                        Clique Ou Arraste Seu Histórico Até Aqui
                    </div>
                </Dragger>
            );
        }
        return ({});
    }

    render() {
        return (
            <div className={"content"}>
                {this.renderUploadContent()}
            </div>
        )
    }
}
