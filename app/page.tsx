// import clsx from "clsx";
// import { useState } from 'react';
"use client"
import { Modal, FileInput, Clipboard, Button, Alert  } from "flowbite-react";
import { HiOutlineArrowRight } from "react-icons/hi";
import { useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {

  const [selectedItem, setSelectedItem] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [isEncrypt, setChosenMethod] = useState('');
  const [isTypeInput, setChosenInput] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const techniques = [
    {id:1, name: "Diffie-Hellman Key Exchange"},
    {id:2, name: "El Gamal Encryption"},
  ];

  const openTechniquePage = (id: number) => {
    const item = techniques.find((item) => item.id === id);
    if(item) {
      setSelectedItem(item.name);
      setOpenModal(true);
      setChosenMethod('');
      setChosenInput('');
    }
  }

  const finishProcessing = () =>{
    setOpenModal(false);
    setShowAlert(true);
  }

  return (
    <div className="bg-white grid grid-rows-[20px_1fr_20px]  items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <AnimatePresence>
        { showAlert ? 
          <motion.div
            key="alert"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
          >
            <Alert color="success" onDismiss={() => setShowAlert(false)}>
              <span className="font-medium">Success!</span> Your message had been successfuly encrypted.
            </Alert> 
          </motion.div>
          : null
          }
      </AnimatePresence>
      <main className="text-black  h-full">
        <div className="w-full flex-col ">
          <h1 className="text-3xl font-bold text-center font-sans mb-5">
            Encrypt and Decrypt your text!
          </h1>
          <div className="flex flex-col gap-1 rounded-md shadow-sm bg-cyan-100 items-center p-4">
            <ul>
              {techniques.map((item)=>(
                <li
                  key={item.id}
                  onClick={() => openTechniquePage(item.id)}
                  className="cursor-pointer text-cyan-800 hover:bg-cyan-600 p-2 rounded text-center"
                >{item.name}</li>
              ))}
            </ul>
            <Modal show={openModal} onClose={() => setOpenModal(false)} size="md">
              <Modal.Header className="font-semibold text-sm">{selectedItem}</Modal.Header>
              <Modal.Body>
                <AnimatePresence mode="wait">
                  {isEncrypt=="encrypt" ? (
                    <motion.div
                      key="encrypt"
                      initial={{ opacity: 0, x:20}}
                      animate={{ opacity: 1, x:0}}
                      exit={{ opacity: 0, x:-20}}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="rounded text-black flex flex-col gap-3">
                        <div className="flex justify-between w-full items-center">
                          <h3 className="font-semibold font-sans text-lg text-gray-400">Encrypt</h3>
                          {/* <div className="grid w-2/5">
                            <div className="relative">
                              <label htmlFor="npm-install" className="sr-only">
                                Label
                              </label>
                              <input
                                id="npm-install"
                                type="text"
                                className="flex w-full rounded-lg border border-gray-300 bg-gray-50 px-2.5 py-3 text-sm text-gray-500 "
                                value="2809"
                                disabled
                                readOnly
                              />
                              <Clipboard.WithIconText valueToCopy="2809" />
                            </div>
                          </div> */}
                        </div>
                        {/* CHOOSING AN OPTION TO INPUT */}
                        <AnimatePresence mode="wait">
                          {isTypeInput=="text" ? (
                            <motion.div
                              key="textInput"
                              initial={{ opacity: 0, x:20}}
                              animate={{ opacity: 1, x:0}}
                              exit={{ opacity: 0, x:-20}}
                              transition={{ duration: 0.5 }}
                              className="flex flex-col gap-2"
                            >
                              <textarea
                                placeholder="Type a message..."
                                className="w-full h-32 p-2 border border-cyan-300 rounded-md resize-none"
                              ></textarea>
                              <div className="flex w-full justify-between">
                                <input type="number" placeholder="Enter public key" className="p-2 text-sm rounded-md border border-cyan-300"></input>
                                <Button onClick={() => finishProcessing()} className="bg-cyan-300 hover:bg-cyan-500">
                                  Encrpyt
                                  <HiOutlineArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                              </div>
                            </motion.div>
                          ) : ( isTypeInput=="file" ? (
                            <motion.div
                              key="fileInput"
                              initial={{ opacity: 0, x:20}}
                              animate={{ opacity: 1, x:0}}
                              exit={{ opacity: 0, x:-20}}
                              transition={{ duration: 0.5 }}
                              className="flex flex-col gap-2"
                            >
                              <div>
                                <FileInput id="file-upload" helperText="TXT file only."/>
                              </div>
                              <div className="flex w-full justify-between">
                                <input type="number" placeholder="Enter public key" className="p-2 text-sm rounded-md border border-cyan-300"></input>
                                <Button className="bg-cyan-300 hover:bg-cyan-500">
                                  Encrpyt
                                  <HiOutlineArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                              </div>
                            </motion.div>
                          ) : 
                            <div className="flex flex-col gap-1">
                              <p className="text-sm text-gray-300 italic">Choose an option</p>
                              <div className="flex gap-2 text-gray-500 text-sm">
                                <div className="cursor-pointer px-4 py-2 border border-cyan-300 rounded-md hover:bg-cyan-300 hover:text-white"
                                  onClick={() => setChosenInput('text')}
                                >
                                  Type a message...
                                </div>
                                <div className="cursor-pointer px-4 py-2 border border-cyan-300 rounded-md hover:bg-cyan-300 hover:text-white"
                                  onClick={() => setChosenInput('file')}
                                >
                                  Upload a text file
                                </div>
                              </div>
                            </div>
                          )}
                        </AnimatePresence>
                        
                      </div>
                    </motion.div>
                  ) : ( isEncrypt=="decrypt" ?
                    <motion.div
                      key="decrypt"
                      initial={{ opacity: 0, x:20}}
                      animate={{ opacity: 1, x:0}}
                      exit={{ opacity: 0, x:-20}}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="p-4 bg-cyan-100 rounded text-center text-black">
                        <h3>Decrypt</h3>
                      </div>
                    </motion.div>
                  : 
                  <div className="flex flex-col gap-3 items-center justify-center text-black">
                    <p>What would you like to do?</p>
                    <div className="flex">
                      <button className="rounded px-4 py-2 bg-cyan-300 rounded-tr-none rounded-br-none"
                        onClick={() => setChosenMethod('encrypt')}
                      >Encrypt</button>
                      <button className="rounded px-4 py-2 border border-cyan-300 text-cyan-300 rounded-tl-none rounded-bl-none"
                        onClick={() => setChosenMethod('decrypt')}
                      >Decrypt</button>
                    </div>
                  </div>
                  )}
                </AnimatePresence>
              </Modal.Body>
            </Modal>
          </div>
        </div>
      </main>
    </div>
  );
}
