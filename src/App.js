import React, { useState } from "react";
import {
  Container,
  Card,
  CardContent,
  makeStyles,
  Grid,
  TextField,
  Button,
} from "@material-ui/core";
import QRCode from "qrcode";
import QrReader from "react-qr-reader";
import { initializeApp } from "firebase/app";
import { getDatabase, set, ref, child, push } from "firebase/database";

//################################# START Firebase Settings ####################################
//quando depois eu explico para vocês como configura o firebase, por hora podem usar o meu
const firebaseConfig = {
  apiKey:
    "AAAAplipsUI:APA91bGQbCDPCuHA-XQRVNJRvYysIqzPqJ4JXk4d9iowYwHgCel81VZCQYqgdqEQaVX2qGWmwyLjGrnkpKtAs56LhlFZaCdRHZMpn9XVLcxtEc7c5GeiD-uMuibIkDFAQVpfV7mtFduP",
  authDomain: "summerjob-9c9bf.firebaseapp.com",
  databaseURL: "https://summerjob-9c9bf-default-rtdb.firebaseio.com/",
};
const app = initializeApp(firebaseConfig);

// Get a reference to the database service
const database = getDatabase(app);
//################################# END Firebase Settings ####################################

//################################# APP ####################################
function App() {
  // States do app
  const [text, setText] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [scanResultWebCam, setScanResultWebCam] = useState("");
  // carregando estilo customizado
  const classes = useStyles();

  // codigo responsavel por gerar o QR code a partir do dado passado para o input
  const generateQrCode = async () => {
    try {
      const response = await QRCode.toDataURL(text);
      setImageUrl(response);
    } catch (error) {
      console.log(error);
    }
  };

  // função responsavel por gerenciar os erros da leitura do QR CODE
  const handleErrorWebCam = (error) => {
    console.log(error);
  };

  // função executada quando há uma leitura do QR code pela camera do notebook
  const handleScanWebCam = (result) => {
    if (result) {
      setScanResultWebCam(result);
    }
  };

  // função responsavel por INSERIR os dados obtidos a partir da leitura do QR CODE
  // para o firebase
  const submitOrder = () => {
    // documentação para tempo real do firebase https://firebase.google.com/docs/database/web/start?authuser=0
    const newPostKey = push(child(ref(database), "ativos")).key;

    const parsedData = JSON.parse(JSON.parse(scanResultWebCam));

    set(ref(database, `ativos/${newPostKey}`), {
      ativo: parsedData["ativo"],
      tombamento: parsedData["tombamento"],
      unidade: parsedData["unidade"],
      setor: parsedData["setor"],
    });

    setScanResultWebCam("");
  };

  return (
    <Container className={classes.conatiner}>
      <Card>
        <h2 className={classes.title}>
          Generate Download & Scan QR Code with React js
        </h2>
        <CardContent>
          <Grid container spacing={2}>
            {/* Parte do codigo HTML responsavel por gerar o QR CODE */}
            <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
              <TextField
                label="Enter Text Here"
                onChange={(e) => setText(e.target.value)}
              />
              <Button
                className={classes.btn}
                variant="contained"
                color="primary"
                onClick={() => generateQrCode()}
              >
                Generate
              </Button>
              <br />
              <br />
              <br />
              {imageUrl ? (
                <a href={imageUrl} download>
                  <img src={imageUrl} alt="img" />
                </a>
              ) : null}
            </Grid>
            {/* END Parte do codigo HTML responsavel por gerar o QR CODE */}

            {/* Parte do codigo HTML responsavel por Ler o QR CODE */}
            <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
              <h3>Qr Code Scan by Web Cam</h3>
              <QrReader
                delay={300}
                style={{ width: "100%" }}
                onError={handleErrorWebCam}
                onScan={handleScanWebCam}
              />
              <h3>Scanned By WebCam Code: {scanResultWebCam}</h3>
              <Button
                className={classes.btn}
                variant="contained"
                color="primary"
                onClick={submitOrder}
              >
                Submit OS
              </Button>
            </Grid>
            {/* END Parte do codigo HTML responsavel por Ler o QR CODE */}
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}

// Criação de um estilo customizado
const useStyles = makeStyles((theme) => ({
  conatiner: {
    marginTop: 10,
  },
  title: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#3f51b5",
    color: "#fff",
    padding: 20,
  },
  btn: {
    marginTop: 10,
    marginBottom: 20,
  },
}));
export default App;
